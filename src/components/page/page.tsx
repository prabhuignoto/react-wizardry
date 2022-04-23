import classNames from "classnames";
import { nanoid } from "nanoid";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";
import { FormField } from "../form-field/form-field";
import { FormFieldProps } from "../form-field/form-field.model";
import { PageModelProps } from "../page/page.model";
import styles from "./page.module.scss";

const Page = forwardRef<{ height: number; id: string }, PageModelProps>(
  ({ fields, title, id, width, hide, onChange }: PageModelProps, ref) => {
    const pageRef = useRef<HTMLDivElement>(null);

    const isFirstRender = useRef(true);

    const [_fields, setFields] = useState<FormFieldProps[]>(
      fields.map((field) => ({
        ...field,
        id: nanoid(),
        isValid: null,
      }))
    );

    const [reValidate, setRevalidate] = useState(0);

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
      () => classNames(styles.page_wrapper, hide ? styles.hide : ""),
      [hide]
    );

    const onHandleInput = useDebouncedCallback((val: string, id: string) => {
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
    }, 200);

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
              isValid: !!field.data,
            };
          }

          return field;
        });

        return result;
      });
    }, [reValidate, _fields.length]);

    useEffect(() => {
      if (!isFirstRender.current) {
        onChange?.(
          id,
          _fields
            .filter((f) => f.isRequired)
            .every(({ isValid }) => isValid !== null && isValid)
        );
      }
    }, [JSON.stringify(_fields)]);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
      }
    }, []);

    return (
      <div className={pageClass} ref={pageRef} style={style}>
        <header className={styles.header}>{title}</header>
        <div className={styles.fields_wrapper}>
          {_fields.map((field) => (
            <FormField key={field.id} {...field} onInput={onHandleInput} />
          ))}
        </div>
      </div>
    );
  }
);

Page.displayName = "Page";

export { Page };
