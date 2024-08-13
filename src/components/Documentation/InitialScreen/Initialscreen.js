import React from "react";
import styles from "./styles.module.css";

const DocumentaionInitialScreen = ({selectOrderIdForKyc, handleKycState}) => {
  const handleKycStage = () => {
    handleKycState(selectOrderIdForKyc);
  };

  return (
    <div>
      <p className={styles.label}>
        Selected order to view its documentation status
      </p>
      <div className={styles.selected_box}># {selectOrderIdForKyc}</div>
      <button className={styles.proceed} onClick={() => handleKycStage()}>
        View Status
      </button>
    </div>
  );
};
export default DocumentaionInitialScreen;
