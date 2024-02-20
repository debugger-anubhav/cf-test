import React, {useState} from "react";

import styles from "../styles.module.css";
import RetainerTable from "./RetainerTable";
import RetianerAccordian from "./RetainerAccordian";

const RetainerInvoice = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };

  if (rows?.length > 0)
    return (
      <>
        <p className={styles.sub_head}>Retainer Invoice</p>
        <div className={styles.web}>
          <RetainerTable
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
        <div className={styles.mobile}>
          <RetianerAccordian
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
      </>
    );
};

export default RetainerInvoice;
