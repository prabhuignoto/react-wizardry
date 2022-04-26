import classNames from "classnames";
import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
} from "react";
import Asterisk from "../../icons/asterisk";
import CheckIcon from "../../icons/check";
import Exclamation from "../../icons/exclamation";
import { WizardContext } from "./../wizard";
import { FormFieldProps } from "./form-field.model";
import styles from "./form-field.module.scss";

const FormField: FunctionComponent<FormFieldProps> = ({
  name,
  id,
  isRequired = false,
  type,
  label,
  selectOptions = [],
  onInput,
  isValid,
  placeholder,
  disabled,
}) => {
  const labelId = useMemo(() => `input-${id}`, []);

  const { highlightFieldsOnValidation: highlight } = useContext(WizardContext);

  const handleChange = useCallback(
    (ev: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTimeElement>) => {
      const target = ev.target as HTMLInputElement;

      const value = target.files?.length ? target.files[0] : target.value;

      onInput?.(value, id || "");
    },
    []
  );

  const fieldClass = useMemo(
    () =>
      classNames(
        styles.form_field,
        isValid ? styles.is_valid : isValid !== null ? styles.is_not_valid : "",
        highlight ? styles.highlight : ""
      ),
    [isValid, highlight]
  );

  const checkClass = useMemo(
    () => classNames(styles.status, isValid ? styles.success : ""),
    [isValid]
  );

  const warnClass = useMemo(
    () => classNames(styles.status, !isValid ? styles.fail : ""),
    []
  );

  const getInputType = useMemo(() => {
    if (type !== "select" && type !== "textarea") {
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
    }
  }, [type, labelId, disabled]);

  return (
    <div className={fieldClass}>
      {isValid ? (
        <span className={checkClass} role="img" aria-label="success">
          <CheckIcon />
        </span>
      ) : !isValid && isValid !== null ? (
        <span className={warnClass} role="img" aria-label="fail">
          <Exclamation />
        </span>
      ) : null}
      <label className={styles.form_field_label} id={labelId}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        {getInputType}
        {type === "select" && (
          <select
            onChange={handleChange}
            disabled={disabled}
            aria-labelledby={labelId}
          >
            {selectOptions.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </select>
        )}
        {type === "textarea" && (
          <textarea disabled={disabled} aria-labelledby={labelId}></textarea>
        )}
        {isRequired && (
          <span
            className={styles.asterisk}
            role="img"
            aria-label="important field"
          >
            <Asterisk />
          </span>
        )}
      </div>
    </div>
  );
};

export { FormField };
