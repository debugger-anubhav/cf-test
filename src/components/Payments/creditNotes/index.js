import React from "react";
import styles from "../styles.module.css";
import CreditTable from "./CreditTable";
import CreditAccordian from "./CreditAccordian";

const CreditNotes = () => {
  const rows = [
    {
      appliedInvoice: "INDL-000029658",
      creditNoteNumber: "INV-KR-999999999",
      amount: "₹9,999",
      creditNoteDate: "12 Sep, 2023 : 11:02 AM",
      status: "Closed",
    },
    {
      appliedInvoice: "INDL-000029658",
      creditNoteNumber: "INV-KR-999999999",
      amount: "₹9,999",
      creditNoteDate: "12 Sep, 2023 : 11:02 AM",
      status: "Closed",
    },
    {
      appliedInvoice: "INDL-000029658",
      creditNoteNumber: "INV-KR-999999999",
      amount: "₹9,999",
      creditNoteDate: "12 Sep, 2023 : 11:02 AM",
      status: "Closed",
    },
    {
      appliedInvoice: "INDL-000029658",
      creditNoteNumber: "INV-KR-999999999",
      amount: "₹9,999",
      creditNoteDate: "12 Sep, 2023 : 11:02 AM",
      status: "Closed",
    },
    {
      appliedInvoice: "INDL-000029658",
      creditNoteNumber: "INV-KR-999999999",
      amount: "₹9,999",
      creditNoteDate: "12 Sep, 2023 : 11:02 AM",
      status: "Closed",
    },

    // Add more rows as needed
  ];
  return (
    <>
      <p className={styles.sub_head}>Credit Notes</p>
      <div className={styles.web}>
        <CreditTable rows={rows} />
      </div>
      <div className={styles.mobile}>
        <CreditAccordian rows={rows} />
      </div>
    </>
  );
};

export default CreditNotes;
