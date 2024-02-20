import React from "react";
import styles from "./styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";

const Accordian = ({
  rows,
  handleShowMore,
  visibleRows,
  setAmountToPay,
  toggleDrawer,
  setInvoiceNumber,
  handleDownload,
}) => {
  const [expanded, setExpanded] = React.useState("panel0");

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {rows.slice(0, visibleRows).map((row, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          key={index}
          onChange={handleChange(`panel${index}`)}
          className={`${expanded === `panel${index}` && "bg-F7F7F8"} ${
            styles.accordian
          }`}>
          <AccordionSummary
            className={styles.accord_summary}
            expandIcon={
              expanded === `panel${index}` ? (
                <Minus className={`mt-3 ${styles.exapnd_icon}`} />
              ) : (
                <Plus className={styles.exapnd_icon} />
              )
            }>
            <Typography className={`${styles.tableHeaderCell}`}>
              Invoice Number: {row.invoice_number}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Date:</span> {row.due_days}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Order Number:</span> {row.deal_code}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Amount:</span>{" "}
              <span className="font-Inter">₹</span>
              {row.total}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Amount Due:</span>{" "}
              <span className="font-Inter">₹</span>
              {row.balance}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Status: </span>
              <span
                className={`${
                  row.current_sub_status === "paid"
                    ? "text-[#67AF7B]"
                    : "text-[#D96060]"
                }`}>
                {row.current_sub_status === "paid" ? "Paid" : "Payment Due"}
              </span>
            </Typography>
            <div className="flex gap-4 mt-1">
              <a href={row.invoice_url} target="_blank" rel="noreferrer">
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
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      {visibleRows < rows.length && (
        <button className={styles.show_more_btn} onClick={handleShowMore}>
          See More
          <DownArrowUnfilled className={styles.down_arrow} />
        </button>
      )}
    </div>
  );
};

export default Accordian;
