import React, {useState} from "react";

import styles from "../styles.module.css";

import PaymentTable from "./PaymentTable";
import PaymentAccordian from "./PaymentAccordian";

const Payments = ({rows, loadingSkeleton}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  return (
    <>
      <p className={styles.sub_head}>Payments</p>
      <div className={styles.web}>
        <PaymentTable
          rows={rows}
          visibleRows={visibleRows}
          handleShowMore={handleShowMore}
          loadingSkeleton={loadingSkeleton}
        />
      </div>
      <div className={styles.mobile}>
        <PaymentAccordian
          rows={rows}
          visibleRows={visibleRows}
          handleShowMore={handleShowMore}
        />
      </div>
    </>
  );
};

export default Payments;
