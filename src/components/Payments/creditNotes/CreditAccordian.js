import React from "react";
import styles from "../styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {DownArrowUnfilled, Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const CreditAccordian = ({rows, handleShowMore, visibleRows}) => {
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
              Applied Invoice: {row.applied_invoices}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Credit Note Number:</span>{" "}
              {row.creditnote_number}
            </Typography>

            <Typography className={styles.tableCell}>
              <span className="font-medium">Amount:</span> {row.balance}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Credit Note Date:</span>{" "}
              {`${format(new Date(row.created_time), "d LLL, yyyy : hh:mm a")}`}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Status: </span>
              <span>{row.status}</span>
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

export default CreditAccordian;
