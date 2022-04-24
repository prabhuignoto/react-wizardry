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
import { Page } from "./page/page";
import { PageModelProps } from "./page/page.model";
import { WizardFooter } from "./wizard-footer/wizard-footer";
import { WizardHeader } from "./wizard-header/wizard-header";
import { WizardProps } from "./wizard.model";
import styles from "./wizard.module.scss";

type PageDim = {
  height: number;
  id: string;
};

const Wizard: FunctionComponent<WizardProps> = ({ pages }) => {
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

  const pageHeights = useRef<PageDim[]>([]);

  const activeIndex = useMemo(() => {
    return wizardPages.findIndex((page) => page.id === activePageId) || 0;
  }, [activePageId, wizardPages.length]);

  /** handlers */
  const handleNext = useCallback(() => {
    if (activeIndex + 1 < wizardPages.length) {
      const newPageId = wizardPages[activeIndex + 1].id;
      setActivePageId(newPageId);
    }
  }, [activePageId, wizardPages.length, activeIndex]);

  const handlePrevious = useCallback(() => {
    if (activeIndex - 1 >= 0) {
      const newPageId = wizardPages[activeIndex - 1].id;
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header_wrapper}>
        <WizardHeader
          pages={wizardPages}
          onSelect={handleSelection}
          activeIndex={activeIndex}
        />
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
          pages={wizardPages}
          activeId={activePageId}
        />
      </div>
    </div>
  );
};

export { Wizard };
