import React from "react";
import styles from "./styles.module.css";
import {BackIcon, PersonIcon} from "@/assets/icon";

const AddressSection = ({setTab}) => {
  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <div className={styles.head_div} onClick={() => setTab()}>
          <BackIcon size={19} />
          <h1 className={styles.head}>Go back to checkout</h1>
        </div>

        <div className={styles.saved_address_div}>
          <div className={styles.saved_add_upper_div}>
            <h1 className={styles.saved_add_head}>Delivering to</h1>
            <button className={styles.change_btn}>Change</button>
          </div>
          <div className={styles.name_div}>
            <PersonIcon color={"#2D9469"} size={20} />
            <p className={styles.saved_name}>Pratyush, 9717314756</p>
          </div>

          <p className={styles.saved_address}>
            117, Block B, Sector 12, Vasundhara, Ghaziabad Uttar Pradesh Uttar
            Pradesh
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AddressSection;
