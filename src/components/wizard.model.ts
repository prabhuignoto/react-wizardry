import { PageModelProps } from "./page.model";

export type WizardPageProps = Pick<PageModelProps, "fields" | "title">;

export type WizardProps = {
  pages: WizardPageProps[];
};
