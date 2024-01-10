import React from "react";
import styles from "../../Payments/styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const CreditTransactionAccordian = ({rows}) => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <div>
      {rows?.map((row, index) => (
        <Accordion
          expanded={expanded === `panel${index}`}
          key={index.toString()}
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
              Transaction ID: {row.txnid}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Credit Mode: </span>
              {row.payment_mode === "CC"
                ? "Credit Card"
                : row.payment_mode === "DC"
                ? "Debit Card"
                : row.payment_mode}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Coins Gained: </span>+
              <span className="font-Inter">₹</span> {row.amount}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Expires on: </span> {row.expire_on}
            </Typography>
            <Typography className={`${styles.tableCell} !pb-0`}>
              <span className="font-medium">Transaction Date: </span>{" "}
              {`${format(new Date(row.created_at), "yyyy-mm-dd  hh:mm:ss")}`}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CreditTransactionAccordian;
