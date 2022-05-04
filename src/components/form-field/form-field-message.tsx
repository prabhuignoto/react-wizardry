import classNames from "classnames";
import React, { FunctionComponent, useMemo } from "react";
import InfoIcon from "../../icons/info";
import styles from "./form-field.module.scss";

export type FormFieldMessageProps = {
  message?: string;
  RTL?: boolean;
  isValid?: boolean | null;
};

const FormFieldMessage: FunctionComponent<FormFieldMessageProps> = ({
  message,
  RTL,
  isValid,
}) => {
  const fieldClass = useMemo(() => {
    return classNames(
      styles.form_field_message_wrapper,
      RTL ? styles.RTL : "",
      !isValid && isValid !== null ? styles.show : styles.hide
    );
  }, [isValid]);

  return (
    <div className={fieldClass}>
      <span className={styles.icon}>
        <InfoIcon />
      </span>
      <span>{message}</span>
    </div>
  );
};

export { FormFieldMessage };
