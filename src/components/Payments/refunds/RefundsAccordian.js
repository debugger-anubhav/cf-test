import React from "react";
import styles from "../styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const RefundsAccordian = ({rows, handleShowMore, visibleRows}) => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {rows?.slice(0, visibleRows).map((row, index) => (
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
              Payment Number: {row.payment_number}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Date :</span> {row.date}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Number:</span>{" "}
              {row.invoice_numbers ? row.invoice_numbers : "NA"}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium"> Amount Refunded:</span>{" "}
              <span className="font-Inter">₹</span>
              {row.bcy_refunded_amount}
            </Typography>{" "}
            <Typography className={styles.tableCell}>
              <span className="font-medium"> Refund Date:</span>{" "}
              {`${format(
                new Date(row.last_modified_time),
                "d LLL, yyyy : hh:mm a",
              )}`}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Payment Number: </span>
              <span>{row.payment_number}</span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}

      {visibleRows < rows?.length && (
        <button className={styles.show_more_btn} onClick={handleShowMore}>
          See More
          <DownArrowUnfilled className={styles.down_arrow} />
        </button>
      )}
    </div>
  );
};

export default RefundsAccordian;
