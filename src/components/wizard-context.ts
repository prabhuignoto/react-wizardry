import { createContext } from "react";
import { contextType } from "./wizard.model";

export const WizardContext = createContext<contextType>({
  RTL: false,
  highlightFieldsOnValidation: false,
  noPageTitle: false,
  silent: false,
  strict: true,
  validationDelay: 250,
});
