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
              <TableRow key={index} className={styles.tableRow}>
                <TableCell
                  className={`
                !text-71717A !text-14 xl:!text-16 !tracking-[-0.28px] xl:!tracking-[-0.32px] !font-Poppins xl:py-8 pl-0 pr-0 !border-b-0 leading-normal pb-3 !flex flex-wrap whitespace-break-spaces !w-[190px] !min-w-[190px] !max-w-[200px] `}>
                  {row.applied_invoices.split(",").join(", ")}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {row.creditnote_number}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <span className="font-Inter">₹</span>
                  {row.total}
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
