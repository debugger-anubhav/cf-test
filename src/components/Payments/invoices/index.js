import React, {useState} from "react";

import styles from "../styles.module.css";
import InvoiceTable from "./InvoiceTable";
import InvoiceAccordian from "./InvoiceAccordian";

const Invoices = ({rows, loadingSkeleton}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  if (rows?.length > 0) {
    return (
      <>
        <p className={styles.sub_head}>Invoices</p>
        <div className={styles.web}>
          <InvoiceTable
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
            loadingSkeleton={loadingSkeleton}
          />
        </div>
        <div className={styles.mobile}>
          <InvoiceAccordian
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
      </>
    );
  }
};

export default Invoices;
