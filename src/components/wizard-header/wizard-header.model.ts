import { PageModelProps } from "../page/page.model";

export type WizardHeaderProps = {
  pages: PageModelProps[];
  onSelect?: (id?: string) => void;
};

export type WizardTabProps = Pick<WizardHeaderProps, "onSelect"> &
  Pick<PageModelProps, "state"> & {
    id?: string;
    selected?: boolean;
    disable?: boolean;
    label?: string;
  };
