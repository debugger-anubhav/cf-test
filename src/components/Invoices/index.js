import React, {useEffect, useState} from "react";
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
// import {getLocalStorage} from "@/constants/constant";
// import {decrypt} from "@/hooks/cryptoUtils";
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import InvoicesSkeleton from "./InvoicesSkeleton";

const InvoicePage = () => {
  const [visibleRows, setVisibleRows] = useState(12);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [availCoins, setAvailCoins] = useState(0);
  const [isCoinApplied, setIsCoinApplied] = useState(false);
  const [amountToPay, setAmountToPay] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState();
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // const userId = decrypt(getLocalStorage("_ga"));
  const userId = 85777;

  const getInvoicesData = () => {
    axios
      .get(baseURL + endPoints.invoicesPage.getMyInvoices(userId, 1))
      .then(res => {
        console.log(res?.data, "responseee");
        setRows(res?.data?.data?.my_invoice);
        setAvailCoins(res?.data?.data?.my_wallet?.topup_amount);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err);
        setLoadingSkeleton(false);
      });
  };

  useEffect(() => {
    getInvoicesData();
  }, []);

  const getTotalAmountDue = () => {
    let sum = 0;
    rows.map(row => (sum = sum + row?.balance));
    return sum;
  };

  const AmountDue = getTotalAmountDue();

  const handleDownload = invoiceUrl => {
    // Create a hidden anchor element
    const anchor = document.createElement("a");
    anchor.href = invoiceUrl;
    anchor.download = "invoice.pdf"; // Set the desired file name
    document.body.appendChild(anchor);

    // Trigger a click event on the anchor element to initiate the download
    anchor.click();

    // Remove the anchor element from the DOM
    document.body.removeChild(anchor);
  };

  const handleShowMore = () => {
    setVisibleRows(prevVisibleRows => prevVisibleRows + 10);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar} style={{height: "initial"}}>
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
            <a href="/payments" target="_blank">
              <span
                // onClick={() => {
                //   router.push("/payments");
                // }}
                className={styles.click_here}>
                Click here
              </span>
            </a>
            to check your past payments
          </p>
          <div className={styles.amount_wrapper}>
            <p className={styles.desc}>
              Total Amount Due: <span className={styles.rupeeIcon}>₹</span>
              {isCoinApplied
                ? AmountDue - availCoins > 0
                  ? AmountDue - availCoins
                  : 0
                : AmountDue}
            </p>
            <button
              disabled={AmountDue === 0}
              onClick={() => {
                setAmountToPay(AmountDue);
                setInvoiceNumber(null);
                toggleDrawer();
              }}
              className={`${
                AmountDue === 0 && "!bg-[#FFDF85] !cursor-not-allowed"
              } ${styles.pay_all_btn}`}>
              Pay all
            </button>

            <PastpaymentDrawer
              toggleDrawer={toggleDrawer}
              open={isDrawerOpen}
              amountDue={amountToPay}
              availbal={availCoins}
              isCoinApplied={isCoinApplied}
              setIsCoinApplied={bool => setIsCoinApplied(bool)}
              invoiceNumber={invoiceNumber}
            />
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
              {loadingSkeleton ? (
                <InvoicesSkeleton />
              ) : (
                <TableBody>
                  {rows.slice(0, visibleRows).map((row, index) => (
                    <TableRow
                      key={index}
                      className={`${
                        index === rows.length - 1 && "!border-b-0"
                      } ${styles.tableRow}`}>
                      <TableCell
                        className={`min-w-[116px] ${styles.tableCell}`}>
                        {row.due_days}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.invoice_number}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.deal_code}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.total}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.balance}
                      </TableCell>
                      <TableCell
                        className={`!font-medium ${
                          row.current_sub_status === "paid"
                            ? "!text-[#67AF7B]"
                            : "!text-[#D96060]"
                        } ${styles.tableCell}`}>
                        {row.current_sub_status === "paid"
                          ? "Paid"
                          : "Payment Due"}
                      </TableCell>
                      <TableCell className={`!flex gap-4 ${styles.tableCell}`}>
                        <button
                          onClick={() => handleDownload(row.invoice_url)}
                          className={styles.download_btn}>
                          Download
                        </button>
                        <button
                          disabled={row.current_sub_status === "paid"}
                          onClick={() => {
                            setAmountToPay(row.balance);
                            setInvoiceNumber(row.invoice_number);
                            toggleDrawer();
                          }}
                          className={`${
                            row.current_sub_status === "paid" &&
                            "!bg-[#FFDF85] !cursor-not-allowed"
                          } ${styles.pay_btn}`}>
                          Pay now
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
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
            setInvoiceNumber={val => setInvoiceNumber(val)}
            toggleDrawer={toggleDrawer}
            setAmountToPay={val => setAmountToPay(val)}
            handleDownload={url => handleDownload(url)}
          />
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
