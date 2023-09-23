import React from "react";
import {toast} from "react-toastify";
import styles from "./styles.module.css";

export const showToastNotification = (message, type) => {
  console.log("fdvb");
  //  Type Specification :-
  //  type = 1 indicates green color
  //  type = 2 indicates yellow color
  //  type = 3 indicates red color

  const isSmallScreen = window.innerWidth <= 768;
  toast(message, {
    position: isSmallScreen ? "bottom-right" : "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      backgroundColor:
        type === 1 ? "#67AF7B" : type === 2 ? "#FFDD66" : "#D96060",
      color: type === 2 ? "#45454A " : "#ffffff",
    },
    className: isSmallScreen
      ? `${styles.customToast} ${styles.customToastMobile}`
      : `${styles.customToast} ${styles.customToastDesktop}`,

    closeButton: (
      <button
        style={{color: type === 2 ? "#45454A " : "#ffffff"}}
        className={styles.custom_close_button}>
        &#x2715;
      </button>
    ),
  });
};
