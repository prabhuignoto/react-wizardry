import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  FormEvent,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useRef,
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
  options = [],
  onInput,
  isValid,
  placeholder,
  disabled,
}) => {
  const _options = useRef(
    options.map((option) => ({
      ...option,
      id: nanoid(),
    }))
  );

  const labelId = useMemo(() => `input-${id}`, []);

  const selectedOptions = useRef<string[]>([]);

  const { highlightFieldsOnValidation: highlight, RTL } =
    useContext(WizardContext);

  const handleChange = useCallback(
    (
      ev: FormEvent<
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTimeElement
        | HTMLTextAreaElement
      >
    ) => {
      const target = ev.target as HTMLInputElement;
      const value = target.files?.length ? target.files[0] : target.value;
      onInput?.(value, id || "");
    },
    []
  );

  const handleCheckBoxChange = useCallback(
    (ev: FormEvent<HTMLInputElement>) => {
      const target = ev.target as HTMLInputElement;

      if (target.checked) {
        selectedOptions.current.push(target.value);
      } else {
        selectedOptions.current = selectedOptions.current.filter(
          (option) => option !== target.value
        );
      }

      onInput?.(selectedOptions.current, id || "");
    },
    []
  );

  const fieldClass = useMemo(
    () =>
      classNames(
        styles.form_field,
        isValid ? styles.is_valid : isValid !== null ? styles.is_not_valid : "",
        highlight ? styles.highlight : "",
        RTL ? styles.RTL : ""
      ),
    [isValid, highlight]
  );

  const checkClass = useMemo(
    () =>
      classNames(
        styles.status,
        isValid ? styles.success : "",
        RTL ? styles.RTL : ""
      ),
    [isValid]
  );

  const warnClass = useMemo(
    () =>
      classNames(
        styles.status,
        !isValid ? styles.fail : "",
        RTL ? styles.RTL : ""
      ),
    []
  );

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
            {_options.current.map((option) => (
              <option key={option.id}>{option.name}</option>
            ))}
          </select>
        )}
        {type === "textarea" && (
          <textarea
            disabled={disabled}
            aria-labelledby={labelId}
            required={isRequired}
            onChange={handleChange}
            name={name}
          ></textarea>
        )}
        {(type === "radio" || type === "checkbox") && (
          <div className={styles.collection_wrapper}>
            {_options.current.map(({ name: optionName, id, value }) => (
              <label key={id}>
                {type === "radio" ? (
                  <input
                    type={type}
                    name={name}
                    value={value as string}
                    onChange={handleChange}
                    id={id}
                    key={id}
                  />
                ) : (
                  <input
                    type={type}
                    name={name}
                    value={value as string}
                    id={id}
                    key={id}
                    onChange={handleCheckBoxChange}
                  />
                )}
                {optionName}
              </label>
            ))}
          </div>
        )}
        {isRequired && (
          <span
            className={classNames(styles.asterisk, RTL ? styles.RTL : "")}
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
