import React from "react";
import styles from "./style.module.css";

const ServiceCard = ({icon, head, desc}) => {
  return (
    <div className={`${styles.service_card_wrapper}`}>
      <img src={icon} className={styles.service_card_img} />
      <p className={styles.service_card_head}>{head}</p>
      <p className={styles.service_card_desc}>{desc}</p>
    </div>
  );
};

export default ServiceCard;
