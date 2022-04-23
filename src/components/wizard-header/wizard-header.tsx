import classNames from "classnames";
import React, { FunctionComponent, useMemo } from "react";
import CheckIcon from "../../icons/check";
import WarnIcon from "../../icons/warning";
import { WizardHeaderProps, WizardTabProps } from "./wizard-header.model";
import styles from "./wizard-header.module.scss";

const WizardTab: FunctionComponent<WizardTabProps> = ({
  id,
  onSelect,
  selected,
  state,
  label,
}) => {
  const containerClass = useMemo(
    () =>
      classNames(styles.icon_container, {
        [styles[state.toLowerCase()]]: true,
      }),
    [state]
  );

  const tabClass = useMemo(
    () =>
      classNames(styles.tab, selected ? styles.selected : "", {
        [styles[state.toLowerCase()]]: true,
      }),
    [state, selected]
  );

  return (
    <li key={id} className={tabClass} onClick={() => onSelect?.(id)}>
      <span className={containerClass}>
        {state === "NOT_VALIDATED" && label}
        {state === "SUCCESS" && <CheckIcon />}
        {state === "FAIL" && <WarnIcon />}
      </span>
    </li>
  );
};

const WizardHeader: FunctionComponent<WizardHeaderProps> = ({
  pages,
  onSelect,
}) => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabs}>
        {pages.map(({ id, isActive, state }, index) => (
          <WizardTab
            key={id}
            id={id}
            selected={isActive}
            onSelect={(id) => onSelect(id)}
            state={state}
            label={index + 1 + ""}
          />
        ))}
      </ul>
    </div>
  );
};

export { WizardHeader };
