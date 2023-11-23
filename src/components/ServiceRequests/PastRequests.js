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
import InvoicesSkeleton from "../Invoices/InvoicesSkeleton";

function PastRequests() {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  useEffect(() => {
    setLoadingSkeleton(false);
  }, []);
  const rows = [
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      invoiceAmount: "₹9,999",
      balance: 100.0,
      status: "Paid",
    },

    // Add more rows as needed
  ];
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
                    <TableCell className={styles.tableCell}>order id</TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.invoiceNumber}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.balance}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.balance}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.invoiceDate}
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
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
