import React from "react";
import styles from "./style.module.css";

const ServiceCard = ({icon, head, desc}) => {
  return (
    <div className={`${styles.service_card_wrapper}`}>
      <div className={`w-100 h-100 absolute z-10`} />
      <div className="relative z-[-1]">
        <img
          src={icon}
          className={styles.service_card_img}
          loading="lazy"
          alt={head}
        />
      </div>
      <p className={styles.service_card_head}>{head}</p>
      <p className={styles.service_card_desc}>{desc}</p>
    </div>
  );
};

export default ServiceCard;
