export type FormFieldProps = {
  name: string;
  id?: string;
  isRequired?: boolean;
  validate?: boolean;
  regex?: string;
  type?: InputType;
  label?: string;
  selectOptions?: Option[];
  onInput?: (val: string | string[] | number | File, id: string) => void;
  isValid?: boolean | null;
  data?: any;
  placeholder?: string;
  disabled?: boolean;
};

export type Option = {
  id?: string;
  name: string;
  value: string;
};

export type InputType =
  | "text"
  | "datetime"
  | "checkbox"
  | "select"
  | "file"
  | "email"
  | "number"
  | "url"
  | "phone"
  | "textarea";
