import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { validator } from "../../utils";
import { FormField } from "../form-field/form-field";
import { FormFieldProps } from "../form-field/form-field.model";
import { PageModelProps } from "../page/page.model";
import { WizardContext } from "../wizard";
import styles from "./page.module.scss";

const Page = forwardRef<{ height: number; id: string }, PageModelProps>(
  ({ fields, title, id, width = 0, hide, onChange }: PageModelProps, ref) => {
    const pageRef = useRef<HTMLDivElement>(null);

    const { validationDelay } = useContext(WizardContext);

    const [_fields, setFields] = useState<FormFieldProps[]>(
      fields.map((field) => ({
        ...field,
        id: nanoid(),
        isValid: null,
      }))
    );

    const [reValidate, setRevalidate] = useState(0);

    const interacted = useRef<boolean>(false);

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

    const onHandleInput = useDebouncedCallback(
      (val: string | string[] | number | File, id: string) => {
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
      },
      validationDelay
    );

    useEffect(() => {
      if (reValidate < 1) {
        return;
      }
      const ids = _fields.filter((f) => f.isRequired).map((f) => f.id);

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
      <div className={pageClass} ref={pageRef} style={style} data-title={title}>
        <header className={styles.header}>{title}</header>
        <div className={styles.fields_wrapper}>
          {_fields.map((field) => (
            <FormField
              key={field.id}
              {...field}
              onInput={onHandleInput}
              disabled={hide}
            />
          ))}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export { Page };
