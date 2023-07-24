// "use client"
import React, {useState} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import string from "@/constants/Constant.json";

const AnnouncementBar = () => {
  const [closeBar, setCloseBar] = useState(false);
  return (
    <>
      {!closeBar && (
        <div className={styles.announcement_bar_wrapper}>
          <p className={styles.announcement_bar_text}>
            {string.landing_page.announcement_bar}
          </p>
          <p
            className={styles.announcement_close_icon}
            onClick={() => setCloseBar(true)}>
            <Close size={20} color={"#fff"} />
          </p>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
