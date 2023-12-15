import React from "react";
import styles from "../styles.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {DownArrowUnfilled} from "@/assets/icon";
import {format} from "date-fns";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CreditTable = ({rows, handleShowMore, visibleRows}) => {
  // const date = new Date(rows?.created_time);

  // Format the date and time
  // const formattedDateTime = format(
  //   rows?.created_time,
  //   "dd MMM, yyyy : hh:mm a",
  //   {
  //     locale: enUS,
  //   },
  // );

  return (
    <>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow
              className={styles.tableRow}
              style={{verticalAlign: "baseline"}}>
              <TableCell className={styles.tableHeaderCell}>
                Applied Invoice
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Credit Note Number
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>Amount</TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Credit Note Date
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows?.slice(0, visibleRows).map((row, index) => (
              <TableRow key={index.toString()} className={styles.tableRow}>
                <TableCell className={`${styles.tableCell}`}>
                  {row.applied_invoices}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.creditnote_number}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.balance}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {`${format(
                    new Date(row.created_time),
                    "d LLL, yyyy : hh:mm a",
                  )}`}
                </TableCell>

                <TableCell
                  className={` 
                       ${styles.tableCell}`}>
                  {row.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {visibleRows < rows?.length && (
          <button className={styles.show_more_btn} onClick={handleShowMore}>
            See More
            <DownArrowUnfilled className={styles.down_arrow} />
          </button>
        )}
      </TableContainer>
    </>
  );
};

export default CreditTable;
