import React from "react";
import styles from "../../Payments/styles.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InvoicesSkeleton from "@/components/Invoices/InvoicesSkeleton";
import {format} from "date-fns";

const CreditTransactionTabel = ({rows, loadingSkeleton}) => {
  return (
    <div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow
              className={styles.tableRow}
              style={{verticalAlign: "baseline"}}>
              <TableCell className={styles.tableHeaderCell}>
                Transaction ID
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Credit Mode
              </TableCell>

              <TableCell className={styles.tableHeaderCell}>
                Coins Gained
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Expires on
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Transaction Date
              </TableCell>
            </TableRow>
          </TableHead>
          {loadingSkeleton ? (
            <InvoicesSkeleton />
          ) : (
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={index.toString()} className={styles.tableRow}>
                  <TableCell className={`${styles.tableCell}`}>
                    {row.txnid}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.payment_mode === "CC"
                      ? "Credit Card"
                      : row.payment_mode === "DC"
                      ? "Debit Card"
                      : row.payment_mode}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    + <span className="font-Inter">₹</span> {row.amount}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {row.expire_on}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {`${format(
                      new Date(row.created_at),
                      "yyyy-MM-dd  hh:mm:ss",
                    )}`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default CreditTransactionTabel;
