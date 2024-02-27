import React, {useEffect, useState} from "react";
import styles from "../Payments/styles.module.css";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const PastRequestAccordian = ({pastRequestData}) => {
  const [rows, setRows] = useState(pastRequestData);
  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);
  const [showAccSummary, setshowAccSummary] = useState(false);

  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);
  return (
    <div>
      {rows?.map((row, index) => {
        return (
          <div
            key={index.toString()}
            className={`${
              index === indexOfActiveAcc && showAccSummary && " mt-4"
            }`}>
            <div
              className={`flex justify-between w-full px-3 pt-6 cursor-pointer items-center ${
                index === indexOfActiveAcc && showAccSummary
                  ? "pb-3 pt-3 bg-F7F7F8"
                  : "pb-6"
              }`}
              onClick={() => {
                setIndexOfActiveAcc(index);
                setshowAccSummary(!showAccSummary);
              }}>
              <p className={`${styles.tableHeaderCell}`}>
                <span className="font-medium">Ticket Id: </span>
                {row?.zoho_case_id}
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
                <span className="font-medium"> Order Id:</span> {row?.order_id}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Request Type:</span>{" "}
                {row?.request_type.replace(/_/g, " ")}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Scheduled Date:</span>{" "}
                {row?.scheduled_datetime
                  ? `${format(new Date(row?.scheduled_datetime), "yyyy-mm-dd")}`
                  : "NA"}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Created Date:</span>{" "}
                {`${format(
                  new Date(row?.created_date),
                  "d LLL, yyyy : hh:mm a",
                )}`}
              </div>
              <div className={styles.tableCell}>
                <span className="font-medium">Status: </span>
                {row?.sub_status}
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
    </div>
  );
};

export default PastRequestAccordian;
