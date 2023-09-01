import React from "react";
import styles from "./style.module.css";
import SubCategorySection from "../section/SubCategorySection";
import {ForwardArrow} from "@/assets/icon";

const Subproduct = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <p className={styles.route_text}>Home</p>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>All Product</p>
            {/* <ForwardArrow size={12} color={"#71717A"} /> */}
          </li>
        </ul>
      </div>
      <div className={styles.product_wrapper}>
        <SubCategorySection />
      </div>
    </div>
  );
};

export default Subproduct;
