import React from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import Invoices from "./invoices";
import Payment from "./payments";
import CreditNotes from "./creditNotes";
import Refunds from "./refunds";
import RetainerInvoice from "./retainerInvoice/index";

const PaymentPage = () => {
  // const rows = [
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Payment Due",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Payment Due",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     orderNumber: "9999999999",
  //     invoiceAmount: "₹9,999",
  //     amountDue: 100.0,
  //     status: "Paid",
  //   },
  //   // Add more rows as needed
  // ];
  // const handleShowMore = () => {
  //   setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  // };
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <h1 className={styles.header}>My Payments</h1>
        <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
          Access your complete payment history on one page. Additionally, you
          have the option to download statement for offline use, providing
          flexibility in monitoring your financial records.
        </p>

        <div className={styles.amount_wrapper}>
          <p className={styles.desc}>
            Total invoices: <span className={styles.rupeeIcon}>₹</span>
            {"1200"}
          </p>
          <p className={styles.desc}>
            Total payment: <span className={styles.rupeeIcon}>₹</span>
            {"1200"}
          </p>
          <p className={styles.desc}>
            Balance: <span className={styles.rupeeIcon}>₹</span>
            {"1200"}
          </p>
          <button className={styles.pay_all_btn}>Download statement</button>
        </div>

        <div>
          <Invoices />
          <Payment />
          <CreditNotes />
          <RetainerInvoice />
          <Refunds />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
