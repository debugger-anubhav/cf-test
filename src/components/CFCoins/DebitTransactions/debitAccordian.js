import React, {useState} from "react";
import styles from "../../Payments/styles.module.css";
import {Minus, Plus} from "@/assets/icon";
import {format} from "date-fns";

const DebitAccordian = ({rows, visibleRows}) => {
  // const [expanded, setExpanded] = React.useState(null);

  // const handleChange = panel => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  const [indexOfActiveAcc, setIndexOfActiveAcc] = useState(null);
  const toggleAccordion = index => {
    setIndexOfActiveAcc(indexOfActiveAcc === index ? null : index);
  };
  return (
    <div>
      {rows?.slice(0, visibleRows).map((row, index) => {
        const isActive = index === indexOfActiveAcc;
        return (
          <div
            key={index.toString()}
            className={`${isActive && styles.active} ${isActive && "mt-4"}`}>
            <div
              className={`flex justify-between w-full px-3 pt-6 cursor-pointer items-center ${
                isActive ? "pb-3 !pt-3 bg-F7F7F8" : "pb-6"
              }`}
              onClick={() => toggleAccordion(index)}>
              <p className={`${styles.tableHeaderCell}`}>
                Invoice Number: {row.order_id}
              </p>
              {isActive ? (
                <Minus className={`${styles.expand_icon}`} />
              ) : (
                <Plus className={styles.expand_icon} />
              )}
            </div>
            {isActive && (
              <div
                className={`w-full flex-col px-3 cursor-pointer ${
                  isActive ? "flex bg-F7F7F8" : "hidden"
                }`}
                onClick={() => setIndexOfActiveAcc(null)}>
                <div className={styles.tableCell}>
                  <span className="font-medium">Invoice Date:</span>{" "}
                  {row?.created_at?.split("T")[0]}
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Coins Used:</span> -
                  <span className="font-Inter">₹</span>
                  {row.amount}
                </div>
                <div className={styles.tableCell}>
                  <span className="font-medium">Transaction Date:</span>{" "}
                  {`${format(
                    new Date(row.created_at),
                    "yyyy-MM-dd  hh:mm:ss",
                  )}`}
                </div>
              </div>
            )}
            {index !== rows.length - 1 && (
              <div
                className={`bg-EDEDEE h-[1px] w-full ${
                  isActive && "mt-4"
                }`}></div>
            )}
          </div>

          // <Accordion
          //   expanded={expanded === `panel${index}`}
          //   key={index}
          //   onChange={handleChange(`panel${index}`)}
          //   className={`${expanded === `panel${index}` && "bg-F7F7F8"}
          // `}>
          //   <AccordionSummary
          //     className={styles.accord_summary}
          //     expandIcon={
          //       expanded === `panel${index}` ? (
          //         <Minus className={`mt-3 ${styles.exapnd_icon}`} />
          //       ) : (
          //         <Plus className={styles.exapnd_icon} />
          //       )
          //     }>
          //     <Typography className={`${styles.tableHeaderCell}`}>
          //       Invoice Number: {row.order_id}
          //     </Typography>
          //   </AccordionSummary>

          //   <AccordionDetails className={styles.accord_details}>
          //     <Typography className={styles.tableCell}>
          //       <span className="font-medium">Invoice Date: </span>
          //       {row?.created_at?.split("T")[0]}
          //     </Typography>
          //     <Typography className={styles.tableCell}>
          //       <span className="font-medium">Coins Used: </span>-
          //       <span className="font-Inter">₹</span>
          //       {row.amount}
          //     </Typography>
          //     <Typography className={`${styles.tableCell} !pb-0`}>
          //       <span className="font-medium">Transaction Date: </span>{" "}
          //       {`${format(new Date(row.created_at), "yyyy-MM-dd  hh:mm:ss")}`}
          //     </Typography>
          //   </AccordionDetails>
          // </Accordion>
        );
      })}
    </div>
  );
};

export default DebitAccordian;
