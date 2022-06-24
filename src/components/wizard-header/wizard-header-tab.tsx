import classNames from "classnames";
import { CSSProperties, FunctionComponent, useContext, useMemo } from "react";
import CheckIcon from "../../icons/check";
import WarnIcon from "../../icons/warning";
import { WizardContext } from "../wizard-context";
import { WizardTabProps } from "./wizard-header.model";
import styles from "./wizard-header.module.scss";

const WizardHeaderTab: FunctionComponent<WizardTabProps> = ({
  id,
  onSelect,
  selected,
  state,
  label,
  highlight,
  disable,
  RTL,
  icon,
  title,
}) => {
  const containerClass = useMemo(
    () =>
      classNames(
        styles.icon_container,
        {
          [styles[state.toLowerCase()]]: true,
        },
        selected ? styles.selected : ""
      ),
    [state, selected]
  );

  const { stepperItemWidth, showStepperTitles, noPageTitle } =
    useContext(WizardContext);

  const canShowTitle = useMemo(
    () => showStepperTitles || noPageTitle,
    [showStepperTitles, noPageTitle]
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
        disable ? styles.disabled : "",
        RTL ? styles.RTL : ""
      ),
    [state, selected, highlight, disable]
  );

  const getLabel = useMemo(
    () => state.split("_").join(" ").toLowerCase(),
    [state]
  );

  const style = useMemo(
    () =>
      ({
        "--rc-wiz-tab-width": stepperItemWidth,
      } as CSSProperties),
    [stepperItemWidth]
  );

  return (
    <li
      aria-disabled={disable}
      className={tabClass}
      key={id}
      onClick={() => onSelect?.(id)}
      role="tab"
      style={style}
      tabIndex={0}
    >
      <span aria-label={getLabel} className={containerClass} role="img">
        {icon || (state === "NOT_VALIDATED" ? label : null)}
        {state === "SUCCESS" && !icon ? <CheckIcon /> : null}
        {state === "FAIL" && !icon ? <WarnIcon /> : null}
      </span>
      {canShowTitle ? <div className={styles.tab_title}>{title}</div> : null}{" "}
    </li>
  );
};

export { WizardHeaderTab };
