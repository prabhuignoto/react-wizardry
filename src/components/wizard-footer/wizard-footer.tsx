import classNames from "classnames";
import React, { FunctionComponent, useMemo } from "react";
import ChevronLeft from "../../icons/chevron-left";
import ChevronRight from "../../icons/chevron-right";
import { WizardFooterProps } from "../wizard-footer/wizard-footer.model";
import styles from "./wizard-footer.module.scss";

const WizardFooter: FunctionComponent<WizardFooterProps> = ({
  onNext,
  onPrev,
  activeId,
  pages,
}) => {
  const activeIndex = useMemo(
    () => pages.findIndex((p) => p.id === activeId),
    [pages.length, activeId]
  );

  const hideBack = useMemo(() => activeIndex === 0, [activeIndex]);

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
    if (activePage?.state === "NOT_VALIDATED") {
      return activePage?.fields.some((field) => field.isRequired);
    }

    return activePage?.state === "FAIL";
  }, [activePage?.state]);

  return (
    <div className={styles.wizard_footer}>
      <span className={styles.message}>
        {isActivePageInvalid
          ? `Form has errors. Please fix it to proceed to the next step.`
          : ""}
      </span>
      <div className={styles.button_controls}>
        {!hideBack && (
          <button className={styles.button} onClick={onPrev}>
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
            onClick={onNext}
          >
            <span>Next</span>
            <span className={styles.btn_icon}>
              <ChevronRight />
            </span>
          </button>
        )}
        {showFinish && (
          <button className={styles.button}>
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
