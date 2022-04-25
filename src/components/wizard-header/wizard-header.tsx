import classNames from "classnames";
import React, { FunctionComponent, useContext, useMemo } from "react";
import CheckIcon from "../../icons/check";
import WarnIcon from "../../icons/warning";
import { WizardContext } from "../wizard";
import { WizardHeaderProps, WizardTabProps } from "./wizard-header.model";
import styles from "./wizard-header.module.scss";

const WizardTab: FunctionComponent<WizardTabProps> = ({
  id,
  onSelect,
  selected,
  state,
  label,
  highlight,
  disable,
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
      classNames(
        styles.tab,
        selected ? styles.selected : "",
        {
          [styles[state.toLowerCase()]]: true,
        },
        highlight ? styles.highlight : "",
        disable ? styles.disabled : ""
      ),
    [state, selected, highlight, disable]
  );

  const getLabel = useMemo(
    () => state.split("_").join(" ").toLowerCase(),
    [state]
  );

  return (
    <li
      key={id}
      className={tabClass}
      onClick={() => onSelect?.(id)}
      role="tab"
      aria-disabled={disable}
      tabIndex={0}
    >
      <span className={containerClass} role="img" aria-label={getLabel}>
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
  activeIndex,
}) => {
  const { strict } = useContext(WizardContext);
  // console.log(activeIndex);
  return (
    <div className={styles.wrapper}>
      <ul className={styles.tabs} role="tablist">
        {pages.map(({ id, isActive, state }, index) => (
          <WizardTab
            key={id}
            id={id}
            selected={isActive}
            onSelect={(id) => onSelect?.(id)}
            state={state}
            label={index + 1 + ""}
            highlight={index < activeIndex}
            disable={strict && index > activeIndex}
          />
        ))}
      </ul>
    </div>
  );
};

export { WizardHeader };
