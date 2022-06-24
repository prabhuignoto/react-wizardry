import { ReactNode } from "react";
import { PageModelProps } from "../page/page.model";

export type WizardHeaderProps = {
  pages: PageModelProps[];
  onSelect?: (id?: string) => void;
  activeIndex: number;
  icons: ReactNode[];
};

export type WizardTabProps = Pick<WizardHeaderProps, "onSelect"> &
  Pick<PageModelProps, "state" | "id"> & {
    selected?: boolean;
    disable?: boolean;
    label?: string;
    highlight?: boolean;
    RTL?: boolean;
    icon?: ReactNode;
    title?: string;
  };
