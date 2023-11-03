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
import {DownArrowUnfilled} from "@/assets/icon";
import Accordian from "./Accordian";
import PastpaymentDrawer from "./Drawer/PastpaymentDrawer";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const InvoicePage = () => {
  const [visibleRows, setVisibleRows] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

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
            <span onClick={toggleDrawer} className={styles.click_here}>
              Click here
            </span>
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
          <Accordian
            rows={rows}
            visibleRows={visibleRows}
            handleShowMore={handleShowMore}
          />
        </div>
      </div>

      {isDrawerOpen && (
        <PastpaymentDrawer
          toggleDrawer={toggleDrawer}
          open={isDrawerOpen}
          totalAmount={"1200"}
        />
      )}
    </div>
  );
};

export default InvoicePage;
