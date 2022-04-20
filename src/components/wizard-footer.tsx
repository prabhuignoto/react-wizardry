import classNames from "classnames";
import React, { FunctionComponent, useMemo } from "react";
import ChevronLeft from "../icons/chevron-left";
import ChevronRight from "../icons/chevron-right";
import { WizardFooterProps } from "./wizard-footer.model";
import styles from "./wizard-footer.module.scss";

const WizardFooter: FunctionComponent<WizardFooterProps> = ({
  onNext,
  onPrev,
  disableNext,
  activeIndex,
  totalPages,
}) => {
  const hideBack = useMemo(() => activeIndex === 0, [activeIndex]);
  const hideNext = useMemo(() => activeIndex === totalPages - 1, [activeIndex]);

  const showFinish = useMemo(
    () => activeIndex === totalPages - 1,
    [activeIndex]
  );

  return (
    <div className={styles.wizard_footer}>
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
  );
};

export { WizardFooter };
