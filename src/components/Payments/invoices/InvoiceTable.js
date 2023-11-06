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

const InvoiceTable = ({rows}) => {
  const [visibleRows, setVisibleRows] = useState(12);

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
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
                Invoice Amount
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>Balance</TableCell>
              <TableCell className={styles.tableHeaderCell}>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.slice(0, visibleRows).map((row, index) => (
              <TableRow key={index} className={styles.tableRow}>
                <TableCell className={`${styles.tableCell}`}>
                  {row.invoiceDate}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.invoiceNumber}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.invoiceAmount}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.balance}
                </TableCell>
                <TableCell
                  className={`!mr-0 ${
                    row.status === "Paid"
                      ? "!text-[#67AF7B]"
                      : "!text-[#D96060]"
                  } ${styles.tableCell}`}>
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
    </div>
  );
};

export default InvoiceTable;
