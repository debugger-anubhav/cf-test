import React from "react";
import styles from "@/components/Payments/styles.module.css";
import DebitTable from "./debitTabel";
import DebitAccordian from "./debitAccordian";

const DebitTransactions = ({rows, loadingSkeleton}) => {
  return (
    <>
      <p className={styles.sub_head}>My Transactions (Debit)</p>
      <div className={styles.web}>
        <DebitTable rows={rows} loadingSkeleton={loadingSkeleton} />
      </div>
      <div className={styles.mobile}>
        <DebitAccordian loadingSkeleton={loadingSkeleton} rows={rows} />
      </div>
    </>
  );
};

export default DebitTransactions;
