import { ReactNode } from "react";
import { PageModelProps } from "./page/page.model";

export type WizardPageProps = Pick<PageModelProps, "fields" | "title">;

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
  tabColor?: string;
  tabLineColor?: string;
  warning?: string;
};

export type WizardProps = {
  pages: WizardPageProps[];
  theme?: Theme;
  highlightFieldsOnValidation?: boolean;
  strict?: boolean;
  validationDelay?: number;
  onFinish?: (values: any) => void;
  globalFormErrorMessage?: string;
  finishMessage?: string;
  RTL?: boolean;
  bodyHeight?: number;
  noPageTitle?: boolean;
  icons?: ReactNode[];
  silent?: boolean;
  stepperItemWidth?: string;
  showStepperTitles?: boolean;
};

export type PageDim = {
  height: number;
  id: string;
};

export type contextType = Pick<
  WizardProps,
  | "highlightFieldsOnValidation"
  | "strict"
  | "validationDelay"
  | "RTL"
  | "noPageTitle"
  | "silent"
  | "stepperItemWidth"
  | "showStepperTitles"
>;
