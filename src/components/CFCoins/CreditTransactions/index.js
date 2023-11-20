import React, {useState} from "react";
import styles from "@/components/Payments/styles.module.css";
import CreditTransactionTabel from "./creditTransactionTabel";
import CreditTransactionAccordian from "./creditTransactionAccordian";

const CreditTransactions = ({rows, loadingSkeleton}) => {
  const [visibleRows, setVisibleRows] = useState(12);
  console.log(setVisibleRows);
  return (
    <>
      <p className={styles.sub_head}>My Transactions (Credit)</p>
      <div className={styles.web}>
        <CreditTransactionTabel rows={rows} visibleRows={visibleRows} />
      </div>
      <div className={styles.mobile}>
        <CreditTransactionAccordian rows={rows} visibleRows={visibleRows} />
      </div>
    </>
  );
};

export default CreditTransactions;
