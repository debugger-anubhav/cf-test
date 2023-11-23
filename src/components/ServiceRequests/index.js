import React from "react";
import styles from "./style.module.css";
import DocSidebar from "../Documentation/Sidebar/DocSidebar";
import {ForwardArrowWithLine} from "@/assets/icon";
import PastRequests from "./PastRequests";
function ServiceRequets() {
  return (
    <div className={styles.main_container}>
      <div className={styles.doc_side_bar}>
        <DocSidebar isOverviewSelected={true} />
      </div>
      <div className={styles.detail_div}>
        <h1 className={styles.header}>My Service Requests</h1>
        <div className={styles.des_wrapper}>
          <p className={`  ${styles.desc}`}>
            Looking for help with your order or have a specific request? This is
            the place to get the help and support you need.
          </p>
          <button className={styles.createRequestBtn}>
            Create a new request
            <ForwardArrowWithLine />
          </button>
        </div>
        <div>
          <PastRequests />
        </div>
      </div>
    </div>
  );
}

export default ServiceRequets;
