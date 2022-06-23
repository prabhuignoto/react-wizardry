import classNames from "classnames";
import { FunctionComponent, useContext, useMemo } from "react";
import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { WizardContext } from "../wizard";
import { WizardFooterProps } from "../wizard-footer/wizard-footer.model";
import styles from "./wizard-footer.module.scss";

const WizardFooter: FunctionComponent<WizardFooterProps> = ({
  onNext,
  onPrev,
  onFinish,
  activeId,
  pages,
  message,
}) => {
  const activeIndex = useMemo(
    () => pages.findIndex((p) => p.id === activeId),
    [pages.length, activeId]
  );

  const hideBack = useMemo(() => activeIndex === 0, [activeIndex]);

  const { strict, RTL } = useContext(WizardContext);

  const footerClass = useMemo(() => classNames(styles.wizard_footer), []);

  const buttonControlsClass = useMemo(
    () => classNames(styles.button_controls, RTL ? styles.RTL : ""),
    []
  );

  const hideNext = useMemo(
    () => activeIndex === pages.length - 1,
    [activeIndex, pages.length]
  );

  const showFinish = useMemo(
    () => activeIndex === pages.length - 1,
    [activeIndex]
  );

  const activePage = useMemo(
    () => pages.find((p) => p.id === activeId),
    [activeId, JSON.stringify(pages)]
  );

  const isActivePageInvalid = useMemo(
    () => activePage?.state === "FAIL",
    [activePage?.state]
  );

  const disableNext = useMemo(() => {
    if (!strict) {
      return false;
    }

    if (activePage?.state === "NOT_VALIDATED") {
      return activePage?.fields.some((field) => field.isRequired);
    }

    return activePage?.state === "FAIL";
  }, [activePage?.state, strict]);

  const nextButtonClass = useMemo(
    () =>
      classNames(
        styles.button,
        RTL ? styles.RTL : "",
        disableNext ? styles.disabled : ""
      ),
    [disableNext]
  );

  const handleNext = () => {
    if (!disableNext) {
      onNext?.();
    }
  };

  return (
    <div className={footerClass}>
      <span className={styles.message} role="alert">
        {isActivePageInvalid ? message : ""}
      </span>
      <div className={buttonControlsClass}>
        {!hideBack && (
          <button
            className={classNames(
              styles.button,
              styles.back,
              RTL ? styles.RTL : ""
            )}
            onClick={onPrev}
            aria-label="go back"
          >
            <span className={styles.btn_icon}>
              <ChevronLeft />
            </span>
            <span>Back</span>
          </button>
        )}
        {!hideNext && (
          <button
            className={nextButtonClass}
            onClick={handleNext}
            aria-label="go forward"
            aria-disabled={disableNext}
            disabled={disableNext}
          >
            <span>Next</span>
            <span className={styles.btn_icon}>
              <ChevronRight />
            </span>
          </button>
        )}
        {showFinish && (
          <button
            className={nextButtonClass}
            aria-label="finish"
            onClick={onFinish}
            disabled={disableNext}
          >
            <span>Finish</span>
            <span className={styles.btn_icon}>
              <ChevronRight />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export { WizardFooter };
