import React from "react";
import styles from "./styles.module.css";
import {BackIcon} from "@/assets/icon";

const AddressSection = ({setTab}) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <div className={styles.head_div} onClick={() => setTab()}>
          <BackIcon size={19} />
          <h1 className={styles.head}>Go back to checkout</h1>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddressSection;
