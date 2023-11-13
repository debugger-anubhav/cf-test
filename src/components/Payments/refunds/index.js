import React, {useState} from "react";

import styles from "../styles.module.css";

import RefundsTable from "./RefundsTable";
import RefundsAccordian from "./RefundsAccordian";

const Refunds = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  // const rows = [
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountRefunded: "₹9,999",
  //     refundDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },

  //   // Add more rows as needed
  // ];
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
