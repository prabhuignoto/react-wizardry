import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  FunctionComponent,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import CheckIcon from "../../icons/check";
import Exclamation from "../../icons/exclamation";
import { WizardContext } from "../wizard-context";
import { FormFieldInput } from "./form-field-input";
import { FormFieldMessage } from "./form-field-message";
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
  validationMessage = "",
}) => {
  const _options = useRef(
    options.map((option) => ({
      ...option,
      id: nanoid(),
    }))
  );

  const labelId = useMemo(() => `input-${id}`, []);

  const selectedOptions = useRef<string[]>([]);

  const {
    highlightFieldsOnValidation: highlight,
    RTL,
    silent,
  } = useContext(WizardContext);

  const [showFieldMessage, setShowFieldMessage] = useState(!silent);

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
        RTL ? styles.RTL : "",
        silent ? styles.no_border : ""
      ),
    [isValid, highlight, silent]
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
      classNames(styles.status, RTL ? styles.RTL : "", {
        [styles.fail]: !isValid && isRequired,
        [styles.warning]: !isValid && !isRequired,
      }),
    [isValid, isRequired]
  );

  const canShowCheckIcon = useMemo(() => isValid, [isValid]);

  const conditionalProps = useMemo(
    () =>
      silent
        ? {
            onMouseEnter() {
              setShowFieldMessage(true);
            },
            onMouseLeave() {
              setShowFieldMessage(false);
            },
          }
        : null,
    [silent]
  );

  return (
    <div className={fieldClass} {...conditionalProps}>
      {canShowCheckIcon ? (
        <span aria-label="success" className={checkClass} role="img">
          <CheckIcon />
        </span>
      ) : !isValid && isValid !== null ? (
        <span aria-label="fail" className={warnClass} role="img">
          <Exclamation />
        </span>
      ) : null}
      <label className={styles.form_field_label} id={labelId}>
        {label}
      </label>
      <div className={styles.input_wrapper}>
        <FormFieldInput
          disabled={disabled}
          handleChange={
            type === "checkbox" ? handleCheckBoxChange : handleChange
          }
          id={id}
          isRequired={isRequired}
          name={name}
          options={_options.current}
          placeholder={placeholder}
          type={type}
        />
        <FormFieldMessage
          RTL={RTL}
          isValid={isValid}
          message={validationMessage}
          show={showFieldMessage}
        />
      </div>
    </div>
  );
};

export { FormField };
