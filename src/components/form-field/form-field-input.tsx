import classNames from "classnames";
import React, { FunctionComponent, useContext, useMemo } from "react";
import Asterisk from "../../icons/asterisk";
import { WizardContext } from "../wizard";
import { FormChangeEvent, FormFieldProps } from "./form-field.model";
import styles from "./form-field.module.scss";

export type FormFieldInputProps = Pick<
  FormFieldProps,
  "disabled" | "id" | "placeholder" | "type" | "isRequired" | "name" | "options"
> & {
  handleChange: FormChangeEvent;
};

const FormFieldInput: FunctionComponent<FormFieldInputProps> = ({
  disabled,
  handleChange,
  id,
  isRequired,
  name,
  options = [],
  placeholder,
  type,
}) => {
  const labelId = useMemo(() => `input-${id}`, []);

  const { RTL } = useContext(WizardContext);

  const isTextField = useMemo(
    () =>
      type !== "checkbox" &&
      type !== "radio" &&
      type !== "select" &&
      type !== "textarea",
    []
  );

  const getInputType = useMemo(() => {
    if (isTextField) {
      return (
        <input
          type={type === "datetime" ? "datetime-local" : type}
          required={isRequired}
          aria-labelledby={labelId}
          onChange={handleChange}
          placeholder={placeholder}
          name={name}
          disabled={disabled}
        />
      );
    } else if (type === "select") {
      return (
        <select
          onChange={handleChange}
          disabled={disabled}
          aria-labelledby={labelId}
        >
          {options.map((option) => (
            <option key={option.id}>{option.name}</option>
          ))}
        </select>
      );
    } else if (type === "textarea") {
      return (
        <textarea
          disabled={disabled}
          aria-labelledby={labelId}
          required={isRequired}
          onChange={handleChange}
          name={name}
        ></textarea>
      );
    } else if (type === "radio" || type === "checkbox") {
      return (
        <div className={styles.collection_wrapper}>
          {options.map(({ name: optionName, id, value }) => (
            <label key={id}>
              <input
                type={type}
                name={name}
                value={value as string}
                onChange={handleChange}
                id={id}
                key={id}
              />
              {optionName}
            </label>
          ))}
        </div>
      );
    }
  }, [type, labelId, disabled, options.length]);

  return (
    <>
      {getInputType}
      {isRequired && (
        <span
          className={classNames(styles.asterisk, RTL ? styles.RTL : "")}
          role="img"
          aria-label="important field"
        >
          <Asterisk />
        </span>
      )}
    </>
  );
};

export { FormFieldInput };
