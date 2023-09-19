import React from "react";
import styles from "./DocMain.module.css";
import DocSidebar from "../Sidebar/DocSidebar";
const DocMain = () => {
  return (
    <div className={styles.mainContainer}>
      <DocSidebar />
      <div></div>
    </div>
  );
};

export default DocMain;
