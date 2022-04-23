import { PageModelProps } from "../page/page.model";

export type WizardFooterProps = {
  onNext: () => void;
  onPrev: () => void;
  activeId: string;
  pages: PageModelProps[];
};
