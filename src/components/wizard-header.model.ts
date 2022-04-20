import { PageModelProps } from "./page.model"

export type WizardHeaderProps = {
  pages: PageModelProps[];
  onSelect: (id?: string) => void;
}

export type WizardTabProps = {
  id?: string;
  onSelected?: (id?: string) => void;
  label: string;
  selected?: boolean;
}