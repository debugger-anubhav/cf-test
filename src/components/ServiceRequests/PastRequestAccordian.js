import React, { useEffect, useState } from "react";
import styles from "../Payments/styles.module.css";
import { Minus, Plus } from "@/assets/icon";
import { format } from "date-fns";
import ManageSchedule from '../MyOrders/orders/partTwo/ManageScheduleDrawer';
import { reduxSetModalState } from "@/store/Slices";
import { useDispatch, useSelector } from "react-redux";

const PastRequestAccordian = ({ pastRequestData }) => {
  const [rows, setRows] = useState(pastRequestData);
  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);
  const dispatch = useDispatch();
  const [isModalopen, setIsModalopen] = useState(false);
  const [orderID, setOrderID] = useState()
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);

  const toggleAccordion = index => {
    setIndexOfActiveAcc(indexOfActiveAcc === index ? null : index);
  };
  const toggleModal = () => {

    setIsModalopen(!isModalopen);
    dispatch(reduxSetModalState(!modalStateFromRedux));
  };

  const handleClick = (value) => {
    setOrderID(value)
    toggleModal()
  }

  return (
    <div>

      {rows?.map((row, index) => {
        const isActive = index === indexOfActiveAcc;

        return (
          <div
            key={index.toString()}
            className={`${isActive && styles.active} ${isActive && "mt-4"}`}>

            <div
              className={`${styles.past_request_accordian_wrapper} ${isActive ? "pb-3 !pt-3 bg-F7F7F8" : "pb-6"
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
                <div className={styles.tableCell}>
                  {
                    orderID && <ManageSchedule
                      page="PageSR"
                      isModalOpen={isModalopen}
                      closeModal={toggleModal}
                      orderId={orderID}
                    />
                  }
                  {row?.request_type === "request_pickup" && <button
                    className={styles.drawer_button}
                    onClick={() => row?.request_type === "request_pickup" && handleClick(row?.order_id)} >
                    Change delivery slot
                  </button>}
                </div>
              </div>
            )}

            {index !== rows.length - 1 && (
              <div
                className={`bg-EDEDEE h-[1px] w-full ${isActive && "mt-4"
                  }`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PastRequestAccordian;
