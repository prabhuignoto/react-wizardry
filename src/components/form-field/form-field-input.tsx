import classNames from "classnames";
import { FunctionComponent, useContext, useMemo } from "react";
import Asterisk from "../../icons/asterisk";
import { WizardContext } from "../wizard-context";
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
          aria-labelledby={labelId}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={isRequired}
          type={type === "datetime" ? "datetime-local" : type}
        />
      );
    } else if (type === "select") {
      return (
        <select
          aria-labelledby={labelId}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={isRequired}
        >
          <option disabled selected value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.id}>{option.name}</option>
          ))}
        </select>
      );
    } else if (type === "textarea") {
      return (
        <textarea
          aria-labelledby={labelId}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          required={isRequired}
        ></textarea>
      );
    } else if (type === "radio" || type === "checkbox") {
      return (
        <div className={styles.collection_wrapper}>
          {options.map(({ name: optionName, id, value }) => (
            <label key={id}>
              <input
                id={id}
                key={id}
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
                value={value as string}
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
          aria-label="important field"
          className={classNames(styles.asterisk, RTL ? styles.RTL : "")}
          role="img"
        >
          <Asterisk />
        </span>
      )}
    </>
  );
};

export { FormFieldInput };
