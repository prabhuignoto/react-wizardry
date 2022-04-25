import classNames from "classnames";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { WizardContext } from "../wizard";
import { WizardFooterProps } from "../wizard-footer/wizard-footer.model";
import styles from "./wizard-footer.module.scss";

const WizardFooter: FunctionComponent<WizardFooterProps> = ({
  onNext,
  onPrev,
  activeId,
  pages,
  message = "Form has errors. Please fix it to proceed to the next step.",
}) => {
  const activeIndex = useMemo(
    () => pages.findIndex((p) => p.id === activeId),
    [pages.length, activeId]
  );

  const hideBack = useMemo(() => activeIndex === 0, [activeIndex]);

  const { strict } = useContext(WizardContext);

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

  const handleNext = useCallback(() => {
    if (!disableNext) {
      onNext?.();
    }
  }, [disableNext]);

  return (
    <div className={styles.wizard_footer}>
      <span className={styles.message} role="alert">
        {isActivePageInvalid ? message : ""}
      </span>
      <div className={styles.button_controls}>
        {!hideBack && (
          <button
            className={classNames(styles.button, styles.back)}
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
            className={classNames(
              styles.button,
              disableNext ? styles.disabled : ""
            )}
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
          <button className={styles.button} aria-label="finish">
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
