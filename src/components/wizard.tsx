import { nanoid } from "nanoid";
import React, {
  createContext,
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FormFieldProps } from "./form-field/form-field.model";
import { Page } from "./page/page";
import { PageModelProps } from "./page/page.model";
import { ThemeDefaults } from "./theme-default";
import { WizardFinish } from "./wizard-finish";
import { WizardFooter } from "./wizard-footer/wizard-footer";
import { WizardHeader } from "./wizard-header/wizard-header";
import { contextType, PageDim, WizardProps } from "./wizard.model";
import styles from "./wizard.module.scss";

export const WizardContext = createContext<contextType>({
  highlightFieldsOnValidation: false,
  strict: true,
  validationDelay: 250,
  RTL: false,
});

const Wizard: FunctionComponent<WizardProps> = ({
  pages = [],
  theme,
  highlightFieldsOnValidation = false,
  strict = true,
  validationDelay = 250,
  onFinish,
  RTL = false,
  finishMessage = "Thanks for submitting the details.",
  globalFormErrorMessage = "Please correct the errors in the form.",
}) => {
  /** pages state */
  const [wizardPages, setWizardPages] = useState<PageModelProps[]>(
    pages.map((page) => ({
      ...page,
      id: nanoid(),
      state: "NOT_VALIDATED",
    }))
  );

  const [activePageId, setActivePageId] = useState(wizardPages[0].id);
  const [wizardWidth, setWizardWidth] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(false);
  const [wizardComplete, setWizardComplete] = useState(false);

  const bodyNode = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const finalTheme = useRef<{ [key: string]: Object }>(
    Object.assign({}, ThemeDefaults, theme)
  );

  const pageHeights = useRef<PageDim[]>([]);

  /** handlers */
  const handleNext = useCallback(() => {
    if (activeIndex + 1 < wizardPages.length) {
      setActiveIndex(activeIndex + 1);
    }
  }, [wizardPages.length, activeIndex]);

  const handlePrevious = useCallback(() => {
    if (activeIndex - 1 >= 0) {
      setActiveIndex(activeIndex - 1);
    }
  }, [wizardPages.length, activeIndex]);

  const handleSelection = (id?: string) => {
    if (id) {
      const index = wizardPages.findIndex((page) => page.id === id);
      setActivePageId(id);
      setActiveIndex(index);
    }
  };

  const initHeights = useCallback(
    (data: { height: number; id: string; fields: FormFieldProps[] }) => {
      if (data) {
        pageHeights.current.push(data);

        if (wizardPages.length === pageHeights.current.length) {
          setPagesLoaded(true);
        }
      }
    },
    [wizardPages.length]
  );

  const onBodyRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      bodyNode.current = node;
      setWizardWidth(node.clientWidth);
    }
  }, []);

  /** side effects */
  useEffect(() => {
    setWizardPages((prev) =>
      prev.map((page) => ({
        ...page,
        isActive: page.id === activePageId,
      }))
    );
  }, [activePageId]);

  useEffect(() => {
    const page = wizardPages[activeIndex];

    if (page) {
      setActivePageId(page.id);
    }
  }, [activeIndex]);

  /** memoized functions */
  const bodyStyle = useMemo(() => {
    if (pagesLoaded) {
      return {
        minHeight: `${Math.max(...pageHeights.current.map((x) => x.height))}px`,
      } as CSSProperties;
    } else {
      return {};
    }
  }, [pagesLoaded]);

  const pagesStyle = useMemo(() => {
    return {
      transform: `translateX(-${activeIndex * wizardWidth}px)`,
    } as CSSProperties;
  }, [activePageId, wizardPages.length, wizardWidth, activeIndex]);

  const onChange = useCallback((id: string, success: boolean) => {
    setWizardPages((prev) =>
      prev.map((page) => {
        if (page.id === id) {
          return {
            ...page,
            state: success ? "SUCCESS" : "FAIL",
          };
        }
        return page;
      })
    );
  }, []);

  const rootStyle = useMemo(
    () =>
      Object.keys(finalTheme.current).reduce(
        (a, b) =>
          Object.assign({}, a, {
            [`--rc-wiz-${b}`]: finalTheme.current[b],
          }),
        {}
      ) as CSSProperties,
    []
  );

  const handleFinish = useCallback(() => {
    const node = bodyNode.current;
    if (node) {
      const pages = node.querySelectorAll(".rc-wiz-page");
      const result: { [key: string]: Object } = {};

      pages.forEach((page) => {
        const title = page.getAttribute("data-title")?.toLowerCase();
        const inputs = Array.from(
          page.querySelectorAll("input:not([type='checkbox'])")
        ) as HTMLInputElement[];

        const checkboxes = Array.from(
          page.querySelectorAll("input[type='checkbox']")
        ) as HTMLInputElement[];

        if (title) {
          result[title] = inputs.reduce(
            (a, b) =>
              Object.assign({}, a, {
                [b.name]: b.value,
              }),
            {}
          );

          if (checkboxes.length) {
            result[title] = Object.assign(result[title], {
              [checkboxes[0].name]: checkboxes
                .filter((checkbox) => checkbox.checked)
                .map((checkbox) => checkbox.value),
            });
          }
        }
      });

      onFinish?.(result);
      setWizardComplete(true);
    }
  }, []);

  return (
    <WizardContext.Provider
      value={{ highlightFieldsOnValidation, strict, validationDelay, RTL }}
    >
      <div className={styles.wrapper} style={rootStyle}>
        <div className={styles.header_wrapper}>
          {!wizardComplete && (
            <WizardHeader
              pages={wizardPages}
              onSelect={handleSelection}
              activeIndex={activeIndex}
            />
          )}
        </div>
        <div className={styles.body_wrapper} style={bodyStyle} ref={onBodyRef}>
          <div className={styles.pages_wrapper} style={pagesStyle}>
            {!wizardComplete &&
              wizardPages.map((page, index) => (
                <Page
                  {...page}
                  key={page.id}
                  ref={initHeights}
                  width={wizardWidth}
                  hide={activeIndex !== index}
                  onChange={onChange}
                />
              ))}
          </div>
          {wizardComplete && <WizardFinish message={finishMessage} />}
        </div>
        <div className={styles.footer_wrapper}>
          {!wizardComplete && (
            <WizardFooter
              onNext={handleNext}
              onPrev={handlePrevious}
              onFinish={handleFinish}
              pages={wizardPages}
              activeId={activePageId}
              message={globalFormErrorMessage}
            />
          )}
        </div>
      </div>
    </WizardContext.Provider>
  );
};

export { Wizard };
