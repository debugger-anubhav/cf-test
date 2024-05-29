import React, {useState} from "react";
import styles from "../styles.module.css";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const CreditAccordian = ({rows, handleShowMore, visibleRows}) => {
  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);
  const toggleAccordion = index => {
    setIndexOfActiveAcc(indexOfActiveAcc === index ? null : index);
  };
  return (
    <div>
      {rows?.slice(0, visibleRows)?.map((row, index) => {
        const isActive = index === indexOfActiveAcc;
        return (
          <div
            key={index.toString()}
            className={`${isActive && styles.active} ${isActive && "mt-4"}`}>
            <div
              className={`flex justify-between w-full px-3 pt-6 cursor-pointer items-center ${
                isActive ? "pb-3 !pt-3 bg-F7F7F8" : "pb-6"
              }`}
              onClick={() => toggleAccordion(index)}>
              <p className={`${styles.tableHeaderCell}`}>
                Applied Invoice: {row.applied_invoices}
              </p>
              {isActive ? (
                <Minus className={`${styles.exapnd_icon}`} />
              ) : (
                <Plus className={styles.exapnd_icon} />
              )}
            </div>
            {isActive && (
              <div
                className={`w-full flex-col px-3 cursor-pointer ${
                  isActive ? "flex bg-F7F7F8" : "hidden"
                }`}
                onClick={() => setIndexOfActiveAcc(null)}>
                <div className={styles.tableCell}>
                  <span className="font-medium">Credit Note Number:</span>{" "}
                  {row.creditnote_number}
                </div>

                <div className={styles.tableCell}>
                  <span className="font-medium">Amount:</span>{" "}
                  <span className="font-Inter">₹</span>
                  {row.total}
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Credit Note Date:</span>{" "}
                  {`${format(
                    new Date(row.created_time),
                    "d LLL, yyyy : hh:mm a",
                  )}`}
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Status: </span>
                  <span>{row.status}</span>
                </div>
              </div>
            )}
            {index !== rows.length - 1 && (
              <div
                className={`bg-EDEDEE h-[1px] w-full ${
                  isActive && "mt-4"
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

export default CreditAccordian;
