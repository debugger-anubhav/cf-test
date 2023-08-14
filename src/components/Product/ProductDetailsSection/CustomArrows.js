import React from "react";
import styles from "./style.module.css";
import {ForwardArrow, BackwardArrow} from "@/assets/icon";

const CustomPrevArrow = ({onClick}) => (
  <div className={`${styles.arrow_div} ${styles.arrowPrev}`}>
    <div className={styles.arrow} onClick={onClick}>
      <BackwardArrow size={24} color={"#45454A"} />
    </div>
  </div>
);

const CustomNextArrow = ({onClick}) => (
  <div className={`${styles.arrow_div} ${styles.arrowNext}`}>
    <div className={styles.arrow} onClick={onClick}>
      <ForwardArrow size={24} color={"#45454A"} />
    </div>
  </div>
);

export {CustomPrevArrow, CustomNextArrow};
