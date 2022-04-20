import { nanoid } from "nanoid";
import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Page } from "./page";
import { PageModelProps } from "./page.model";
import { WizardFooter } from "./wizard-footer";
import { WizardHeader } from "./wizard-header";
import { WizardProps } from "./wizard.model";
import styles from "./wizard.module.scss";

type PageDim = {
  height: number;
  id: string;
};

const Wizard: FunctionComponent<WizardProps> = ({ pages }) => {
  /** wizard state */
  const [wizardPages, setWizardPages] = useState<PageModelProps[]>(
    pages.map((page) => ({
      ...page,
      id: nanoid(),
      isValid: null,
    }))
  );

  const [activePageId, setActivePageId] = useState(wizardPages[0].id);
  const [wizardWidth, setWizardWidth] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(false);

  const pageHeights = useRef<PageDim[]>([]);

  /** handlers */
  const handleNext = useCallback(() => {
    const curIndex = wizardPages.findIndex((page) => page.id === activePageId);

    if (curIndex + 1 < wizardPages.length) {
      const newPageId = wizardPages[curIndex + 1].id;
      setActivePageId(newPageId);
    }
  }, [activePageId, wizardPages.length]);

  const handlePrevious = useCallback(() => {
    const curIndex = wizardPages.findIndex((page) => page.id === activePageId);

    if (curIndex - 1 >= 0) {
      const newPageId = wizardPages[curIndex - 1].id;
      setActivePageId(newPageId);
    }
  }, [activePageId]);

  const handleSelection = (id?: string) => {
    if (id) {
      setActivePageId(id);
    }
  };

  const initHeights = useCallback(
    (data: { height: number; id: string }) => {
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

  const activeIndex = useMemo(() => {
    return wizardPages.findIndex((page) => page.id === activePageId) || 0;
  }, [activePageId]);

  const pagesStyle = useMemo(() => {
    return {
      transform: `translateX(-${activeIndex * wizardWidth}px)`,
    } as CSSProperties;
  }, [activePageId, wizardPages.length, wizardWidth, activeIndex]);

  const onChange = useCallback(
    (id: string, success: boolean) => {
      console.log(id, success);
      setWizardPages((prev) =>
        prev.map((page) => {
          if (page.id === id) {
            return {
              ...page,
              isValid: success,
            };
          }
          return page;
        })
      );
    },
    [wizardPages.length]
  );

  const disableNext = useMemo(() => {
    const page = wizardPages.find((x) => x.id === activePageId);

    if (page?.isValid === null) {
      return page.fields.some((f) => f.isRequired);
    }

    return page?.isValid !== null && !page?.isValid;
  }, [activePageId, JSON.stringify(wizardPages)]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header_wrapper}>
        <WizardHeader pages={wizardPages} onSelect={handleSelection} />
      </div>
      <div className={styles.body_wrapper} style={bodyStyle} ref={onBodyRef}>
        <div className={styles.pages_wrapper} style={pagesStyle}>
          {wizardPages.map((page, index) => (
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
      </div>
      <div className={styles.footer_wrapper}>
        <WizardFooter
          onNext={handleNext}
          onPrev={handlePrevious}
          disableNext={disableNext}
          totalPages={pages.length}
          activeIndex={activeIndex}
        />
      </div>
    </div>
  );
};

export { Wizard };
