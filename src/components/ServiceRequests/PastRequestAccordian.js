import React, {useEffect, useState} from "react";
import styles from "../Payments/styles.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const PastRequestAccordian = ({pastRequestData}) => {
  const [expanded, setExpanded] = React.useState(null);
  const [rows, setRows] = useState(pastRequestData);

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    setRows(pastRequestData);
  }, [pastRequestData]);
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
              <span className="font-medium">Ticket Id:</span>
              {row?.zoho_case_id}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.accord_details}>
            <Typography className={styles.tableCell}>
              <span className="font-medium"> Order Id:</span> {row?.order_id}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Request Type:</span>{" "}
              {row?.request_type}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Scheduled Date:</span>{" "}
              {row?.scheduled_datetime
                ? `${format(new Date(row?.scheduled_datetime), "yyyy-mm-dd")}`
                : "NA"}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Created Date:</span>{" "}
              {`${format(
                new Date(row?.created_date),
                "d LLL, yyyy : hh:mm a",
              )}`}
            </Typography>
            <Typography className={styles.tableCell}>
              <span className="font-medium">Status: </span>
              {row?.status}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default PastRequestAccordian;
