export type FormFieldProps = {
  name: string;
  id?: string;
  isRequired?: boolean;
  regex?: string;
  type?: "text" | "datetime" | "checkbox" | "select";
  label?: string;
  selectOptions?: Option[];
  onInput?: (val: string, id: string) => void;
  isValid?: boolean | null;
  data?: any;
  placeholder?: string;
};

export type Option = {
  id?: string;
  name: string;
  value: string;
};
  