import classNames from "classnames";
import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useMemo,
} from "react";
import Asterisk from "../../icons/asterisk";
import CheckIcon from "../../icons/check";
import WarnIcon from "../../icons/warning";
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
}) => {
  const labelId = useMemo(() => `input-${id}`, []);

  const handleInput = useCallback((ev: FormEvent<HTMLInputElement>) => {
    const ele = ev.target as HTMLInputElement;
    onInput?.(ele.value, id || "");
  }, []);

  const fieldClass = useMemo(
    () =>
      classNames(
        styles.form_field,
        isValid ? styles.is_valid : isValid !== null ? styles.is_not_valid : ""
      ),
    [isValid]
  );

  return (
    <div className={fieldClass}>
      {isValid ? (
        <span
          className={classNames(styles.status, isValid ? styles.success : "")}
          role="img"
          aria-label="success"
        >
          <CheckIcon />
        </span>
      ) : !isValid && isValid !== null ? (
        <span
          className={classNames(styles.status, !isValid ? styles.fail : "")}
          role="img"
          aria-label="fail"
        >
          <WarnIcon />
        </span>
      ) : null}
      <label className={styles.form_field_label} id={labelId}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        {type === "text" && (
          <input
            type="text"
            required={isRequired}
            aria-labelledby={labelId}
            onInput={handleInput}
            placeholder={placeholder}
            name={name}
          />
        )}
        {type === "checkbox" && (
          <input
            type="checkbox"
            required={isRequired}
            aria-labelledby={labelId}
            name={name}
          />
        )}
        {type === "select" && (
          <select>
            {selectOptions.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </select>
        )}
        {type === "datetime" && (
          <input
            type="datetime-local"
            required={isRequired}
            aria-labelledby={labelId}
            name={name}
          />
        )}
        {isRequired && (
          <span className={styles.asterisk}>
            <Asterisk />
          </span>
        )}
      </div>
    </div>
  );
};

export { FormField };
