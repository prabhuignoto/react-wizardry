import classNames from "classnames";
import React, { FunctionComponent } from "react";
import styles from "./form-field.module.scss";

export type FormFieldMessageProps = {
  message?: string;
  RTL?: boolean;
};

const FormFieldMessage: FunctionComponent<FormFieldMessageProps> = ({
  message,
  RTL,
}) => {
  return (
    <div
      className={classNames(
        styles.form_field_message_wrapper,
        RTL ? styles.RTL : ""
      )}
    >
      {message}
    </div>
  );
};

export { FormFieldMessage };
