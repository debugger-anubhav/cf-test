import React, {useEffect, useState} from "react";
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
import {format} from "date-fns";
import InvoicesSkeleton from "../Invoices/InvoicesSkeleton";

function PastRequests({pastRequestData, loadingSkeleton}) {
  const [rows, setRows] = useState(pastRequestData);

  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);

  return (
    <div>
      <div className={styles.web}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <p className="text-20 text-45454A font-medium font-Poppins mb-8">
            Your past requests
          </p>
          <Table className={styles.table}>
            <TableHead>
              <TableRow
                className={styles.tableRow}
                style={{verticalAlign: "baseline"}}>
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
                    <TableCell className={`${styles.tableCell} capitalize`}>
                      {row?.request_type}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row?.scheduled_datetime
                        ? `${format(
                            new Date(row?.scheduled_datetime),
                            "yyyy-mm-dd",
                          )}`
                        : "NA"}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {`${format(
                        new Date(row?.created_date),
                        "d LLL, yyyy : hh:mm a",
                      )}`}
                    </TableCell>
                    <TableCell className="!text-71717A lg:!text-16 !font-Poppins">
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
