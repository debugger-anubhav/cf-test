import React, {useState} from "react";
import styles from "./styles.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {DownArrowUnfilled, Plus} from "@/assets/icon";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const InvoicePage = () => {
  const [visibleRows, setVisibleRows] = useState(12);
  const rows = [
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Payment Due",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Payment Due",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    {
      invoiceDate: "2023-10-01",
      invoiceNumber: "INV-KR-999999999",
      orderNumber: "9999999999",
      invoiceAmount: "₹9,999",
      amountDue: 100.0,
      status: "Paid",
    },
    // Add more rows as needed
  ];
  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.right_div}>
        <h1 className={styles.header}>My Invoices</h1>
        <p className={` mt-6 xl:mt-8 ${styles.desc}`}>
          View and pay individual invoices or choose the convenience of
          &quot;Pay All&quot; to clear your entire outstanding balance at once.
        </p>

        <div className={styles.past_payment_wrapper}>
          <p className={styles.desc}>
            <span className={styles.click_here}>Click here</span>
            to check your past payments
          </p>
          <div className={styles.amount_wrapper}>
            <p className={styles.desc}>
              Total Amount Due: <span className={styles.rupeeIcon}>₹</span>
              {"1200"}
            </p>
            <button className={styles.pay_all_btn}>Pay all</button>
          </div>
        </div>

        <div className={styles.web}>
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
                    Order Number
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    Invoice Amount
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    Amount Due
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    Status
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.slice(0, visibleRows).map((row, index) => (
                  <TableRow key={index} className={styles.tableRow}>
                    <TableCell className={`min-w-[116px] ${styles.tableCell}`}>
                      {row.invoiceDate}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.invoiceNumber}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.orderNumber}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.invoiceAmount}
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {row.amountDue}
                    </TableCell>
                    <TableCell
                      className={`${
                        row.status === "Paid"
                          ? "!text-[#67AF7B]"
                          : "!text-[#D96060]"
                      } ${styles.tableCell}`}>
                      {row.status}
                    </TableCell>
                    <TableCell className={`flex gap-4 ${styles.tableCell}`}>
                      <button className={styles.download_btn}>Download</button>
                      <button
                        className={`${
                          row.status === "Paid" &&
                          "!bg-[#FFDF85] !cursor-not-allowed"
                        } ${styles.pay_btn}`}>
                        Pay now
                      </button>
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

        <div className={styles.mobile}>
          <div>
            {rows.map((row, index) => (
              <Accordion key={index} className={styles.accordian}>
                <AccordionSummary
                  className={styles.accord_summary}
                  expandIcon={<Plus />}>
                  <Typography className={styles.tableHeaderCell}>
                    Invoice Number: {row.invoiceNumber}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className={styles.accord_details}>
                  <Typography className={styles.tableCell}>
                    Invoice Date: {row.invoiceDate}
                  </Typography>
                  <Typography className={styles.tableCell}>
                    Order Number: {row.orderNumber}
                  </Typography>
                  <Typography className={styles.tableCell}>
                    Invoice Amount: {row.invoiceAmount}
                  </Typography>
                  <Typography className={styles.tableCell}>
                    Amount Due: {row.amountDue}
                  </Typography>
                  <Typography className={styles.tableCell}>
                    Status: {row.status}
                  </Typography>
                  <div className="flex gap-4 mt-1">
                    <button className={styles.download_btn}>Download</button>
                    <button
                      className={`${
                        row.status === "Paid" &&
                        "!bg-[#FFDF85] !cursor-not-allowed"
                      } ${styles.pay_btn}`}>
                      Pay now
                    </button>
                  </div>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
