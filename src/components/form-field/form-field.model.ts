import { ChangeEvent } from "react";

export type Option = {
  id?: string;
  name: string;
  value: string | number | boolean;
};

export type InputType =
  | "text"
  | "date"
  | "datetime"
  | "checkbox"
  | "select"
  | "file"
  | "email"
  | "number"
  | "url"
  | "phone"
  | "radio"
  | "textarea";

export type FormFieldProps = {
  name: string;
  id?: string;
  isRequired?: boolean;
  validate?: boolean;
  regex?: string;
  type?: InputType;
  label?: string;
  data?: string | number | File | string[];
  options?: Option[];
  onInput?: (val: string | string[] | number | File, id: string) => void;
  isValid?: boolean | null;
  placeholder?: string;
  disabled?: boolean;
  validationMessage?: string;
};

export type FormChangeEvent = (
  e: ChangeEvent<
    HTMLSelectElement | HTMLTextAreaElement | HTMLTimeElement | HTMLInputElement
  >
) => void;
