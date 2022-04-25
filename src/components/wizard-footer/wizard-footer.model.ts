import { PageModelProps } from "../page/page.model";

export type WizardFooterProps = {
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
  activeId?: string;
  pages: PageModelProps[];
  message?: string;
};
