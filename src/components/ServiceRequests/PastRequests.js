import React, { useEffect, useState } from "react";
import styles from "../Invoices/styles.module.css";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { reduxSetModalState } from "@/store/Slices";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import InvoicesSkeleton from "../Invoices/InvoicesSkeleton";
import ManageSchedule from '../MyOrders/orders/partTwo/ManageScheduleDrawer'
function PastRequests({ pastRequestData, loadingSkeleton }) {

  const [rows, setRows] = useState(pastRequestData);
  const dispatch = useDispatch();
  const [isModalopen, setIsModalopen] = useState(false);
  const [orderID, setOrderID] = useState()
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);

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
      <div className={styles.web}>
        <ManageSchedule
          isModalOpen={isModalopen}
          closeModal={toggleModal}
          orderId={orderID ? orderID : "-"}
        />
        <TableContainer component={Paper} className={styles.tableContainer}>
          <p className={styles.past_request_heading}>Your past requests</p>
          <Table className={styles.table}>
            <TableHead>
              <TableRow
                className={styles.tableRow}
                style={{ verticalAlign: "baseline" }}>
                <TableCell className={styles.tableHeaderCell}>
                  Order Id
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  Ticket Id
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  Request Type
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  Scheduled Date
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  Created Date
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>Status</TableCell>
              </TableRow>
            </TableHead>
            {loadingSkeleton ? (
              <InvoicesSkeleton />
            ) : (
              <TableBody>
                {rows?.map((row, index) => (

                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      {row?.order_id}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row?.zoho_case_id}
                    </TableCell>
                    <TableCell onClick={() => row?.request_type === "request_pickup" && handleClick(row?.order_id)} className={`${styles.tableCell} capitalize`}>
                      {row?.request_type.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row?.scheduled_datetime
                        ? `${format(
                          new Date(row?.scheduled_datetime),
                          "yyyy-MM-dd",
                        )}`
                        : "NA"}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {`${format(
                        new Date(row?.created_date),
                        "d LLL, yyyy : hh:mm a",
                      )}`}
                    </TableCell>
                    <TableCell className="!text-71717A lg:!text-16 !tracking-desc !lg:tracking-0.3 !font-Poppins">
                      {row?.sub_status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default PastRequests;

