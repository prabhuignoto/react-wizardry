import classNames from "classnames";
import { FunctionComponent, useContext, useMemo } from "react";
import { WizardContext } from "../wizard-context";
import { WizardHeaderTab } from "./wizard-header-tab";
import { WizardHeaderProps } from "./wizard-header.model";
import styles from "./wizard-header.module.scss";

const WizardHeader: FunctionComponent<WizardHeaderProps> = ({
  pages,
  onSelect,
  activeIndex,
  icons,
}) => {
  const { strict, RTL, noPageTitle, showStepperTitles } =
    useContext(WizardContext);

  const wrapperClass = useMemo(
    () =>
      classNames(
        styles.wrapper,
        RTL ? styles.RTL : "",
        noPageTitle || showStepperTitles ? styles.stepper_title_enabled : ""
      ),
    []
  );
  return (
    <div className={wrapperClass}>
      <ul className={styles.tabs} role="tablist">
        {pages.map(({ id, isActive, state, title }, index) => (
          <WizardHeaderTab
            RTL={RTL}
            disable={strict && state !== "SUCCESS"}
            highlight={index <= activeIndex}
            icon={icons && icons[index]}
            id={id}
            key={id}
            label={index + 1 + ""}
            onSelect={(id) => onSelect?.(id)}
            selected={isActive}
            state={state}
            title={title}
          />
        ))}
      </ul>
    </div>
  );
};

export { WizardHeader };
