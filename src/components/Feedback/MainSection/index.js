import React from "react";
import styles from "./style.module.css";
import BreadCrumbs from "@/components/Common/BreadCrumbs";

export default function MainSection() {
  return (
    <div className={styles.wrapper}>
      <BreadCrumbs currentPage={"Feedback"} />
    </div>
  );
}
