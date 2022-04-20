import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { WizardHeaderProps, WizardTabProps } from "./wizard-header.model";
import styles from "./wizard-header.module.scss";

const WizardTab: FunctionComponent<WizardTabProps> = ({
  id,
  label,
  onSelected,
  selected,
}) => {
  return (
    <li
      key={id}
      className={classNames(styles.tab, selected ? styles.selected : "")}
      onClick={() => onSelected?.(id)}
    >
      {label}
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
        {pages.map(({ id, isActive }, index) => (
          <WizardTab
            key={id}
            id={id}
            label={`${index + 1}`}
            selected={isActive}
            onSelected={(id) => onSelect(id)}
          />
        ))}
      </ul>
    </div>
  );
};

export { WizardHeader };
