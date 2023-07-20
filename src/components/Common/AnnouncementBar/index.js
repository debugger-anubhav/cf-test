import React from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import string from "@/constants/Constant.json";

const AnnouncementBar = () => {
  return (
    <div className={styles.announcement_bar_wrapper}>
      <p className={styles.announcement_bar_text}>
        {string.landing_page.announcement_bar}
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
