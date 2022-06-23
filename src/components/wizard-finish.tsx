import { FunctionComponent } from "react";
import CircleCheck from "../icons/circle-check";
import styles from "./wizard-finish.module.scss";

export type WizardFinishProps = {
  message?: string;
};

const WizardFinish: FunctionComponent<WizardFinishProps> = ({
  message = "Thanks for submitting the details",
}) => {
  return (
    <div className={styles.wizard_finish}>
      <span className={styles.icon}>
        <CircleCheck />
      </span>
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export { WizardFinish };
