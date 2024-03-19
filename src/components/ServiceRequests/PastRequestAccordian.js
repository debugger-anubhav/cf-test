import React, {useEffect, useState} from "react";
import styles from "../Payments/styles.module.css";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const PastRequestAccordian = ({pastRequestData}) => {
  const [rows, setRows] = useState(pastRequestData);
  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);

  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);

  const toggleAccordion = index => {
    setIndexOfActiveAcc(indexOfActiveAcc === index ? null : index);
  };

  return (
    <div>
      {rows?.map((row, index) => {
        const isActive = index === indexOfActiveAcc;

        return (
          <div
            key={index.toString()}
            className={`${isActive && styles.active} ${isActive && "mt-4"}`}>
            <div
              className={`${styles.past_request_accordian_wrapper} ${
                isActive ? "pb-3 !pt-3 bg-F7F7F8" : "pb-6"
              }`}
              onClick={() => toggleAccordion(index)}>
              <p className={`${styles.tableHeaderCell}`}>
                <span className="font-medium">Ticket Id: </span>
                {row?.zoho_case_id}
              </p>
              {isActive ? (
                <Minus className={`${styles.exapnd_icon}`} />
              ) : (
                <Plus className={styles.exapnd_icon} />
              )}
            </div>

            {isActive && (
              <div className={styles.past_request_accordian_details}>
                <div className={styles.tableCell}>
                  <span className="font-medium"> Order Id:</span>{" "}
                  {row?.order_id}
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Request Type:</span>{" "}
                  <span className="capitalize">
                    {row?.request_type.replace(/_/g, " ")}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Scheduled Date:</span>{" "}
                  {row?.scheduled_datetime
                    ? `${format(
                        new Date(row?.scheduled_datetime),
                        "yyyy-MM-dd",
                      )}`
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
    </div>
  );
};

export default PastRequestAccordian;
