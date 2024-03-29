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
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
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

  const userId = decrypt(getLocalStorage("_ga"));

  const getInvoicesData = () => {
    baseInstance
      .get(endPoints.invoicesPage.getMyInvoices(userId, 1))
      .then(res => {
        setRows(res?.data?.data?.my_invoice);
        setAvailCoins(res?.data?.data?.my_wallet?.topup_amount);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
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
            <span className={styles.click_here}>
              <a href="/payments" target="_blank">
                Click here
              </a>
            </span>
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
              setAvailbal={setAvailCoins}
              isCoinApplied={isCoinApplied}
              setIsCoinApplied={setIsCoinApplied}
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
                  <TableCell className={`${styles.tableHeaderCell} !px-0`}>
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
                        className={`min-w-[116px] ${styles.tableCell} !px-0`}>
                        {row.due_days}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.invoice_number}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        {row.deal_code}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <span className="font-Inter">₹</span>
                        {row.total}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <span className="font-Inter">₹</span>
                        {row.balance}
                      </TableCell>
                      <TableCell
                        className={`!font-medium 
                        ${styles.tableCellStatus}
                        ${
                          row.current_sub_status === "paid"
                            ? "!text-[#67AF7B]"
                            : "!text-[#D96060]"
                        } `}>
                        {row.current_sub_status === "paid"
                          ? "Paid"
                          : "Payment Due"}
                      </TableCell>
                      <TableCell className={`!flex gap-4 ${styles.tableCell}`}>
                        <a
                          href={row.invoice_url}
                          target="_blank"
                          rel="noreferrer">
                          <button
                            // onClick={() => handleDownload(row.invoice_url)}
                            className={styles.download_btn}>
                            Download
                          </button>
                        </a>
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
          />
        </div>

        {!loadingSkeleton && rows.length === 0 && (
          <p className={styles.no_invoices_txt}>
            When you place an order successfully, invoice will be shown here.
          </p>
        )}
      </div>
    </div>
  );
};

export default InvoicePage;
