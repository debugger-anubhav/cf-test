import React from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";

const AnnouncementBar = () => {
  return (
    <div className={styles.announcement_bar_wrapper}>
      <p className={styles.announcement_bar_text}>
        {' Exclusive Offer - Additional 20% OFF. Use Code "RENT20"'}
      </p>
      <Close
        size={20}
        className={styles.announcement_close_icon}
        color={"#fff"}
      />
    </div>
  );
};

export default AnnouncementBar;
