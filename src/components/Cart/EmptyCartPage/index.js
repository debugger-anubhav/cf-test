import React from "react";
import styles from "./style.module.css";
import {categoryImageBaseUrl} from "@/constants/constant";
import {ArrowForw} from "@/assets/icon";

const EmptyCartPage = () => {
  return (
    <div className={styles.main_wrapper}>
      <div>
        <img
          className={styles.img}
          src={`${categoryImageBaseUrl + "illustration-empty-cart.svg"}`}
        />
      </div>
      <p className={styles.head}>Your cart is empty!</p>
      <p className={styles.desc}>Add items to it now.</p>
      <button className={styles.btn} onClick={""}>
        Start renting <ArrowForw size={19} color={"#222"} />
      </button>
    </div>
  );
};

export default EmptyCartPage;
