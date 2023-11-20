import React from "react";
import styles from "../../Payments/styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {Minus, Plus} from "@/assets/icon";

const CreditTransactionAccordian = ({rows, visibleRows}) => {
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
              Invoice Number: INV-KR-999999999
              {/* {row.invoice_number} */}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Date:</span>
              {/* {row.date} */}
              2023-10-24
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Coins Used:</span>
              {/* {row.total} */}
              +₹97.00
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Transaction Date:</span>{" "}
              {/* {row.balance} */}
              2022-05-17 18:44:22
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CreditTransactionAccordian;
