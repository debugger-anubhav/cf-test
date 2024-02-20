import React, {useState} from "react";

import styles from "../styles.module.css";

import RefundsTable from "./RefundsTable";
import RefundsAccordian from "./RefundsAccordian";

const Refunds = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };

  if (rows?.length > 0)
    return (
      <>
        <p className={styles.sub_head}>Refunds</p>
        <div className={styles.web}>
          <RefundsTable
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
        <div className={styles.mobile}>
          <RefundsAccordian
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
      </>
    );
};

export default Refunds;
