import React from "react";
import styles from "./styles.module.css";

const Header = ({setTab, tab, offlineCustomer}) => {
  return (
    <div className={styles.header_wrapper}>
      <p
        onClick={() => setTab(0)}
        className={`${tab === 0 && styles.selected_tab} ${styles.header}`}>
        My orders
      </p>
      <p
        onClick={() => {
          if (!offlineCustomer) setTab(1);
        }}
        className={`${offlineCustomer && "!cursor-not-allowed"} ${
          tab === 1 ? styles.selected_tab : "!border-r-transparent"
        } ${styles.header}`}>
        My Subscriptions
      </p>
      <div className={`w-full !border-r-0 ${styles.header}`}></div>
    </div>
  );
};

export default Header;
