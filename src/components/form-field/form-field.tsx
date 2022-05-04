import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from "react";
import CheckIcon from "../../icons/check";
import Exclamation from "../../icons/exclamation";
import { WizardContext } from "./../wizard";
import { FormFieldInput } from "./form-field-input";
import { FormChangeEvent, FormFieldProps } from "./form-field.model";
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

  const handleChange = useCallback<FormChangeEvent>((ev) => {
    const target = ev.target as HTMLInputElement;
    const value = target.files?.length ? target.files[0] : target.value;
    onInput?.(value, id || "");
  }, []);

  const handleCheckBoxChange = useCallback<FormChangeEvent>((ev) => {
    const target = ev.target as HTMLInputElement;

    if (target.checked) {
      selectedOptions.current.push(target.value);
    } else {
      selectedOptions.current = selectedOptions.current.filter(
        (option) => option !== target.value
      );
    }

    onInput?.(selectedOptions.current, id || "");
  }, []);

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
        <FormFieldInput
          type={type}
          disabled={disabled}
          id={id}
          options={_options.current}
          isRequired={isRequired}
          name={name}
          placeholder={placeholder}
          handleChange={
            type === "checkbox" ? handleCheckBoxChange : handleChange
          }
        />
      </div>
    </div>
  );
};

export { FormField };
