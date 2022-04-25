import { PageModelProps } from "./page/page.model";

export type WizardPageProps = Pick<PageModelProps, "fields" | "title">;

export type WizardProps = {
  pages: WizardPageProps[];
  theme?: Theme;
  highlightFieldsOnValidation?: boolean;
  strict?: boolean;
  validationDelay?: number;
};

export type Theme = {
  background?: string;
  fail?: string;
  formFieldBackground?: string;
  primary?: string;
  success?: string;
  textColor?: string;
  formFieldBorder?: string;
  inputBackground?: string;
  inputTextColor?: string;
};
