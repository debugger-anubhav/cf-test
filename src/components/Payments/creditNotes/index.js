import React, {useState} from "react";
import styles from "../styles.module.css";
import CreditTable from "./CreditTable";
import CreditAccordian from "./CreditAccordian";

const CreditNotes = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  // const rows = [
  //   {
  //     appliedInvoice: "INDL-000029658",
  //     creditNoteNumber: "INV-KR-999999999",
  //     amount: "₹9,999",
  //     creditNoteDate: "12 Sep, 2023 : 11:02 AM",
  //     status: "Closed",
  //   },
  //   {
  //     appliedInvoice: "INDL-000029658",
  //     creditNoteNumber: "INV-KR-999999999",
  //     amount: "₹9,999",
  //     creditNoteDate: "12 Sep, 2023 : 11:02 AM",
  //     status: "Closed",
  //   },
  //   {
  //     appliedInvoice: "INDL-000029658",
  //     creditNoteNumber: "INV-KR-999999999",
  //     amount: "₹9,999",
  //     creditNoteDate: "12 Sep, 2023 : 11:02 AM",
  //     status: "Closed",
  //   },
  //   {
  //     appliedInvoice: "INDL-000029658",
  //     creditNoteNumber: "INV-KR-999999999",
  //     amount: "₹9,999",
  //     creditNoteDate: "12 Sep, 2023 : 11:02 AM",
  //     status: "Closed",
  //   },
  //   {
  //     appliedInvoice: "INDL-000029658",
  //     creditNoteNumber: "INV-KR-999999999",
  //     amount: "₹9,999",
  //     creditNoteDate: "12 Sep, 2023 : 11:02 AM",
  //     status: "Closed",
  //   },

  //   // Add more rows as needed
  // ];
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
};

export default CreditNotes;
