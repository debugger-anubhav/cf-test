import React, {useState} from "react";
import styles from "../styles.module.css";
import CreditTable from "./CreditTable";
import CreditAccordian from "./CreditAccordian";

const CreditNotes = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };

  if (rows?.length > 0) {
    return (
      <>
        <p className={styles.sub_head}>Credit Notes</p>
        <div className={styles.web}>
          <CreditTable
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
        <div className={styles.mobile}>
          <CreditAccordian
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
      </>
    );
  }
};

export default CreditNotes;
