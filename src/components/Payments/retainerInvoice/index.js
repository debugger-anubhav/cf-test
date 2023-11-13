import React, {useState} from "react";

import styles from "../styles.module.css";
import RetainerTable from "./RetainerTable";
import RetianerAccordian from "./RetainerAccordian";

const RetainerInvoice = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  // const rows = [
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },
  //   {
  //     invoiceDate: "2023-10-01",
  //     invoiceNumber: "INV-KR-999999999",
  //     amountPaid: "₹9,999",
  //     paymentDate: "12 Sep, 2023 : 11:02 AM",
  //     paymentNumber: "CP-DL-000051953",
  //   },

  //   // Add more rows as needed
  // ];
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
