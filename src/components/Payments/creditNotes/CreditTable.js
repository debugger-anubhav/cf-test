import React, {useState} from "react";
import styles from "../styles.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {DownArrowUnfilled} from "@/assets/icon";

// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CreditTable = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
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
            {rows.slice(0, visibleRows).map((row, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell className={`${styles.tableCell}`}>
                  {row.appliedInvoice}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.creditNoteNumber}
                </TableCell>
                <TableCell className={styles.tableCell}>{row.amount}</TableCell>
                <TableCell className={styles.tableCell}>
                  {row.creditNoteDate}
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

        {visibleRows < rows.length && (
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
