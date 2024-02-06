import React from "react";
import styles from "../../Payments/styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const DebitAccordian = ({rows, visibleRows}) => {
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
              Invoice Number: {row.order_id}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Invoice Date: </span>
              {row?.created_at?.split("T")[0]}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Coins Used: </span>-
              <span className="font-Inter">₹</span>
              {row.amount}
            </Typography>
            <Typography className={`${styles.tableCell} !pb-0`}>
              <span className="font-medium">Transaction Date: </span>{" "}
              {`${format(new Date(row.created_at), "yyyy-MM-dd  hh:mm:ss")}`}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default DebitAccordian;
