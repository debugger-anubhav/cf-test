import React from "react";

import styles from "../styles.module.css";
import InvoiceTable from "./InvoiceTable";
import InvoiceAccordian from "./InvoiceAccordian";

const Invoices = () => {
  const rows = [
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Overdue",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Overdue",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },

    // Add more rows as needed
  ];
  return (
    <>
      <p className={styles.sub_head}>Invoices</p>
      <div className={styles.web}>
        <InvoiceTable rows={rows} />
      </div>
      <div className={styles.mobile}>
        <InvoiceAccordian rows={rows} />
      </div>
    </>
  );
};

export default Invoices;
