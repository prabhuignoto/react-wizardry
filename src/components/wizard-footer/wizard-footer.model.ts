import { PageModelProps } from "../page/page.model";

export interface WizardFooterProps {
  onNext?: () => void;
  onPrev?: () => void;
  onFinish?: () => void;
  activeId?: string;
  pages: PageModelProps[];
  message?: string;
}
