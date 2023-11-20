import React from "react";
import styles from "@/components/Payments/styles.module.css";
import CreditTransactionTabel from "./creditTransactionTabel";
import CreditTransactionAccordian from "./creditTransactionAccordian";

const CreditTransactions = ({rows, loadingSkeleton}) => {
  return (
    <>
      <p className={styles.sub_head}>My Transactions (Credit)</p>
      <div className={styles.web}>
        <CreditTransactionTabel rows={rows} loadingSkeleton={loadingSkeleton} />
      </div>
      <div className={styles.mobile}>
        <CreditTransactionAccordian
          rows={rows}
          loadingSkeleton={loadingSkeleton}
        />
      </div>
    </>
  );
};

export default CreditTransactions;
