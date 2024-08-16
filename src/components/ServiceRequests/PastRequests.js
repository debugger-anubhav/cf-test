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
import { EditIcon } from "@/assets/icon";


function PastRequests({ pastRequestData, loadingSkeleton }) {

  const [rows, setRows] = useState(pastRequestData);
  const dispatch = useDispatch();
  const [isModalopen, setIsModalopen] = useState(false);
  const [orderID, setOrderID] = useState()
  const [ticketID, setTicketID] = useState();
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);
  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);

  const toggleModal = () => {
    setIsModalopen(!isModalopen);
    dispatch(reduxSetModalState(!modalStateFromRedux));
  };

  const handleClick = (value, ticketId) => {
    setOrderID(value)
    setTicketID(ticketId)
    toggleModal()
  }

  // 'request_pickup':'request_pickup',
  // 'pickup_and_refund':'Pickup and Refund',
  // 'repair':'repair',
  // 'installation':'installation',
  // 'replacement':'replacement',
  // 'upgrade':'upgrade',
  // 'relocation':'relocation',
  // 'switch':'switch'

  const ShowPop = (value) => {
    if (value === "request_pickup") {
      return true
    } else if (value === "pickup_and_refund") {
      return true
    }
    else if (value === "repair") {
      return true
    }
    else if (value === "installation") {
      return true
    }
    else if (value === "replacement") {
      return true
    }
    else if (value === "upgrade") {
      return true
    }
    else if (value === "relocation") {
      return true
    }
    else if (value === "switch") {
      return true
    } else {
      return false
    }
  }


  return (
    <div>
      <div className={styles.web}>
        {orderID && <ManageSchedule
          page="PageSR"
          isModalOpen={isModalopen}
          closeModal={toggleModal}
          orderId={orderID}
          ticketID={ticketID}
        />}
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
                {/* <TableCell className={styles.tableHeaderCell}>Action</TableCell> */}
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
                    <TableCell className={`${styles.tableCell} capitalize`}>
                      {console.log(row?.request_type, "Hello")}
                      {row?.request_type.replace(/_/g, " ")}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <span className="flex gap-2 whitespace-nowrap">{row?.scheduled_datetime
                        ? `${format(
                          new Date(row?.scheduled_datetime),
                          "yyyy-MM-dd",
                        )}`
                        : "NA"}
                        {ShowPop(row?.request_type) && <span onClick={() => handleClick(row?.order_id, row?.zoho_case_id)} className={"cursor-pointer"} ><EditIcon size={18} /> </span>}
                      </span>
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
                    {/* <TableCell className="!text-71717A lg:!text-16 !tracking-desc !lg:tracking-0.3 !font-Poppins">
                      {row?.request_type === "request_pickup" && <button
                        className={styles.drawer_button}
                        onClick={() => row?.request_type === "request_pickup" && handleClick(row?.order_id)} >
                        Change delivery slot
                      </button>}
                    </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div >
  );
}

export default PastRequests;

