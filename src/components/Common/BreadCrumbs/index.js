import {ForwardArrow} from "@/assets/icon";
import React from "react";
import styles from "./style.module.css";

export default function BreadCrumbsCommon({currentPage}) {
  return (
    <div className={styles.bread_crumbs}>
      <a href={"/"}>
        <p className={styles.bread_crumbs_text}>Home</p>
      </a>
      <ForwardArrow color={"#71717A"} size={12} />
      <p className={`${styles.bread_crumbs_text} !font-medium`}>
        {currentPage}
      </p>
    </div>
  );
}
