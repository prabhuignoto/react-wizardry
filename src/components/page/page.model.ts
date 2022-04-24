import { FormFieldProps } from "../form-field/form-field.model";

export type PageModelProps = {
  id: string;
  onChange?: (id: string, success: boolean) => void;
  data?: any;
  fields: FormFieldProps[];
  isActive?: boolean;
  title?: string;
  width?: number;
  hide?: boolean;
  state: "NOT_VALIDATED" | "SUCCESS" | "FAIL";
};
