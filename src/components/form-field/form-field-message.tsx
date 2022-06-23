import classNames from "classnames";
import { FunctionComponent, useMemo } from "react";
import InfoIcon from "../../icons/info";
import styles from "./form-field-message.module.scss";

export type FormFieldMessageProps = {
  message?: string;
  RTL?: boolean;
  isValid?: boolean | null;
  show?: boolean;
};

const FormFieldMessage: FunctionComponent<FormFieldMessageProps> = ({
  message,
  RTL,
  isValid,
  show,
}) => {
  const fieldClass = useMemo(() => {
    return classNames(
      styles.form_field_message_wrapper,
      RTL ? styles.RTL : "",
      !isValid && isValid !== null && show ? styles.show : styles.hide
    );
  }, [isValid, show]);

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
