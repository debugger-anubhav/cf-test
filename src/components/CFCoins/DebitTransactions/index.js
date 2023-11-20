import React, {useState} from "react";
import styles from "@/components/Payments/styles.module.css";
import DebitTable from "./debitTabel";
import DebitAccordian from "./debitAccordian";

const DebitTransactions = ({rows, loadingSkeleton}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };

  return (
    <>
      <p className={styles.sub_head}>My Transactions (Debit)</p>
      <div className={styles.web}>
        <DebitTable
          rows={rows}
          visibleRows={visibleRows}
          handleShowMore={handleShowMore}
          loadingSkeleton={loadingSkeleton}
        />
      </div>
      <div className={styles.mobile}>
        <DebitAccordian
          rows={rows}
          visibleRows={visibleRows}
          handleShowMore={handleShowMore}
        />
      </div>
    </>
  );
};

export default DebitTransactions;
