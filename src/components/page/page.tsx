import classNames from "classnames";
import { nanoid } from "nanoid";
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState
} from "react";
import { getValidationMessage, validator } from "../../utils";
import { FormField } from "../form-field/form-field";
import { FormFieldProps } from "../form-field/form-field.model";
import { PageModelProps } from "../page/page.model";
import { WizardContext } from './../wizard-context';
import styles from "./page.module.scss";

const Page = forwardRef<{ height: number; id: string }, PageModelProps>(
  ({ fields, title, id, width = 0, hide, onChange }: PageModelProps, ref) => {
    const pageRef = useRef<HTMLDivElement>(null);

    const [_fields, setFields] = useState<FormFieldProps[]>(
      fields.map((field) => ({
        ...field,
        id: nanoid(),
        isValid: null,
        validate: field.isRequired || field.validate,
        validationMessage:
          field.validationMessage || getValidationMessage(field.type),
      }))
    );

    const [reValidate, setRevalidate] = useState(0);

    const interacted = useRef<boolean>(false);

    const { RTL, noPageTitle } = useContext(WizardContext);

    useImperativeHandle(ref, () => ({
      height: pageRef.current?.clientHeight || 0,
      id: id || "",
    }));

    const style = useMemo(() => {
      return {
        width: `${width}px`,
      };
    }, [width]);

    const pageClass = useMemo(
      () =>
        classNames(styles.page_wrapper, hide ? styles.hide : "", "rc-wiz-page"),
      [hide]
    );

    const onHandleInput = (
      val: string | string[] | number | File,
      id: string
    ) => {
      interacted.current = true;
      setFields((prev) =>
        prev.map((field) => {
          if (field.id === id) {
            return {
              ...field,
              data: val,
            };
          }
          return field;
        })
      );
      setRevalidate(new Date().getMilliseconds());
    };

    useEffect(() => {
      if (reValidate < 1) {
        return;
      }
      const ids = _fields
        .filter((f) => f.isRequired || f.validate)
        .map((f) => f.id);

      setFields((prev) => {
        const result = prev.map((field) => {
          if (ids.indexOf(field.id) > -1) {
            return {
              ...field,
              isValid: field.data ? validator(field.data, field.type) : false,
            };
          }

          return field;
        });

        return result;
      });
    }, [reValidate, _fields.length]);

    useEffect(() => {
      if (interacted.current) {
        onChange?.(
          id,
          _fields
            .filter((f) => f.isRequired)
            .every(({ isValid }) => isValid !== null && isValid)
        );
      }
    }, [JSON.stringify(_fields)]);

    return (
      <div className={pageClass} data-title={title} ref={pageRef} style={style}>
        {!noPageTitle && (
          <header className={classNames(styles.header, RTL ? styles.RTL : "")}>
            {title}
          </header>
        )}
        <div
          className={classNames(styles.fields_wrapper, RTL ? styles.RTL : "")}
        >
          {_fields.map((field) => (
            <FormField
              key={field.id}
              {...field}
              disabled={hide}
              onInput={onHandleInput}
            />
          ))}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export { Page };

