import React, {useState} from "react";
import styles from "./styles.module.css";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";

const Accordian = ({
  rows,
  handleShowMore,
  visibleRows,
  setAmountToPay,
  toggleDrawer,
  setInvoiceNumber,
  handleDownload,
}) => {
  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);
  const [showAccSummary, setshowAccSummary] = useState(false);
  return (
    <div>
      {rows?.slice(0, visibleRows)?.map((row, index) => {
        return (
          <div
            key={index.toString()}
            className={`${
              index === indexOfActiveAcc && showAccSummary && " mt-4"
            }`}>
            <div
              className={`flex justify-between w-full px-3 pt-6 cursor-pointer items-center ${
                index === indexOfActiveAcc && showAccSummary
                  ? "pb-3 !pt-3 bg-F7F7F8"
                  : "pb-6"
              }`}
              onClick={() => {
                setIndexOfActiveAcc(index);
                setshowAccSummary(!showAccSummary);
              }}>
              <p className={`${styles.tableHeaderCell}`}>
                Invoice Number: {row.invoice_number}
              </p>
              {index === indexOfActiveAcc && showAccSummary ? (
                <Minus className={`${styles.exapnd_icon}`} />
              ) : (
                <Plus className={styles.exapnd_icon} />
              )}
            </div>

            <div
              className={`w-full flex-col px-3 cursor-pointer ${
                index === indexOfActiveAcc && showAccSummary
                  ? "flex bg-F7F7F8"
                  : "hidden"
              }`}
              onClick={() => setshowAccSummary(!showAccSummary)}>
              <div className={styles.tableCell}>
                <span className="font-medium">Invoice Date:</span>{" "}
                {row.due_days}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Order Number:</span>{" "}
                {row.deal_code}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Invoice Amount:</span>{" "}
                <span className="font-Inter">₹</span>
                {row.total}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Amount Due:</span>{" "}
                <span className="font-Inter">₹</span>
                {row.balance}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Status: </span>
                <span
                  className={`${
                    row.current_sub_status === "paid"
                      ? "text-[#67AF7B]"
                      : "text-[#D96060]"
                  }`}>
                  {row.current_sub_status === "paid" ? "Paid" : "Payment Due"}
                </span>
              </div>
              <div className="flex gap-4 mt-1 pb-4">
                <a href={row.invoice_url} target="_blank" rel="noreferrer">
                  <button
                    // onClick={() => handleDownload(row.invoice_url)}
                    className={styles.download_btn}>
                    Download
                  </button>
                </a>
                <button
                  disabled={row.current_sub_status === "paid"}
                  onClick={() => {
                    setAmountToPay(row.balance);
                    setInvoiceNumber(row.invoice_number);
                    toggleDrawer();
                  }}
                  className={`${
                    row.current_sub_status === "paid" &&
                    "!bg-[#FFDF85] !cursor-not-allowed"
                  } ${styles.pay_btn}`}>
                  Pay now
                </button>
              </div>
            </div>

            {index !== rows.length - 1 && (
              <div
                className={`bg-EDEDEE h-[1px] w-full ${
                  index === indexOfActiveAcc && showAccSummary && "mt-4"
                }`}></div>
            )}
          </div>
        );
      })}

      {visibleRows < rows.length && (
        <button className={styles.show_more_btn} onClick={handleShowMore}>
          See More
          <DownArrowUnfilled className={styles.down_arrow} />
        </button>
      )}
    </div>
  );
};

export default Accordian;
