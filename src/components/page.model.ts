import { FormFieldProps } from "./form-field.model";

export type PageModelProps = {
  id: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (id: string, success: boolean) => void;
  data?: any;
  fields: FormFieldProps[];
  isActive?: boolean;
  title?: string;
  width?: number;
  hide?: boolean;
  isValid?: boolean | null;
};
