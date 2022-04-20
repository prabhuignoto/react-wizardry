export type WizardFooterProps = {
  onNext: () => void;
  onPrev: () => void;
  disableNext?: boolean;
  totalPages: number;
  activeIndex: number;
};
