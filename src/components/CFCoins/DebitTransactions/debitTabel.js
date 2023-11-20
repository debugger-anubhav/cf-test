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

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DebitTable = ({rows, visibleRows, loadingSkeleton}) => {
  return (
    <div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow
              className={styles.tableRow}
              style={{verticalAlign: "baseline"}}>
              <TableCell className={styles.tableHeaderCell}>
                Invoice Date
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Invoice Number
              </TableCell>

              <TableCell className={styles.tableHeaderCell}>
                Coins Used
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
              {rows?.slice(0, visibleRows).map((row, index) => (
                <TableRow key={index} className={styles.tableRow}>
                  <TableCell className={`${styles.tableCell}`}>
                    {/* {row.date} */}
                    {row.invoiceDate}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {/* {row.invoice_number} */}
                    {row.invoiceNumber}
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {/* {row.total} */}
                    -₹97.00
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    {/* {row.balance} */}
                    2022-05-17 18:44:22
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

export default DebitTable;
