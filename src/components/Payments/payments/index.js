import React from "react";

import styles from "../styles.module.css";

import PaymentTable from "./PaymentTable";
import PaymentAccordian from "./PaymentAccordian";

const Payments = () => {
  const rows = [
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      amountPaid: "₹9,999",
      paymentDate: "12 Sep, 2023 : 11:02 AM",
      paymentNumber: "CP-DL-000051953",
    },

    // Add more rows as needed
  ];
  return (
    <>
      <p className={styles.sub_head}>Payments</p>
      <div className={styles.web}>
        <PaymentTable rows={rows} />
      </div>
      <div className={styles.mobile}>
        <PaymentAccordian rows={rows} />
      </div>
    </>
  );
};

export default Payments;
