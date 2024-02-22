import React, {useState} from "react";
import styles from "../styles.module.css";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const RefundsAccordian = ({rows, handleShowMore, visibleRows}) => {
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
                Payment Number: {row.payment_number}
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
                <span className="font-medium">Invoice Date :</span> {row.date}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Invoice Number:</span>{" "}
                {row.invoice_numbers ? row.invoice_numbers : "NA"}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium"> Amount Refunded:</span>{" "}
                <span className="font-Inter">₹</span>
                {row.bcy_refunded_amount}
              </div>{" "}
              <div className={styles.tableCell}>
                <span className="font-medium"> Refund Date:</span>{" "}
                {`${format(
                  new Date(row.last_modified_time),
                  "d LLL, yyyy : hh:mm a",
                )}`}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Payment Number: </span>
                <span>{row.payment_number}</span>
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

      {visibleRows < rows?.length && (
        <button className={styles.show_more_btn} onClick={handleShowMore}>
          See More
          <DownArrowUnfilled className={styles.down_arrow} />
        </button>
      )}
    </div>
  );
};

export default RefundsAccordian;
