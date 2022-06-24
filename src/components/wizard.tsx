import { nanoid } from "nanoid";
import {
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
import { WizardContext } from "./wizard-context";
import { WizardFinish } from "./wizard-finish";
import { WizardFooter } from "./wizard-footer/wizard-footer";
import { WizardHeader } from "./wizard-header/wizard-header";
import { PageDim, WizardProps } from "./wizard.model";
import styles from "./wizard.module.scss";

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
  bodyHeight = 500,
  noPageTitle = false,
  icons = [],
  silent = false,
  stepperItemWidth = "200px",
  showStepperTitles = false,
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
        minHeight: `${bodyHeight}px`,
        overflowY: "auto",
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

        const dropDowns = page.querySelectorAll("select");

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

          if (dropDowns.length) {
            result[title] = Object.assign(result[title], {
              [dropDowns[0].name]: dropDowns[0].value,
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
      value={{
        RTL,
        highlightFieldsOnValidation,
        noPageTitle,
        showStepperTitles,
        silent,
        stepperItemWidth,
        strict,
        validationDelay,
      }}
    >
      <div className={styles.wrapper} style={rootStyle}>
        <div className={styles.header_wrapper}>
          {!wizardComplete && (
            <WizardHeader
              activeIndex={activeIndex}
              icons={icons}
              onSelect={handleSelection}
              pages={wizardPages}
            />
          )}
        </div>
        <div className={styles.body_wrapper} ref={onBodyRef} style={bodyStyle}>
          <div className={styles.pages_wrapper} style={pagesStyle}>
            {!wizardComplete &&
              wizardPages.map((page, index) => (
                <Page
                  {...page}
                  hide={activeIndex !== index}
                  key={page.id}
                  onChange={onChange}
                  ref={initHeights}
                  width={wizardWidth}
                />
              ))}
          </div>
          {wizardComplete && <WizardFinish message={finishMessage} />}
        </div>
        <div className={styles.footer_wrapper}>
          {!wizardComplete && (
            <WizardFooter
              activeId={activePageId}
              message={globalFormErrorMessage}
              onFinish={handleFinish}
              onNext={handleNext}
              onPrev={handlePrevious}
              pages={wizardPages}
            />
          )}
        </div>
      </div>
    </WizardContext.Provider>
  );
};

export { Wizard };
