import React from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import Checkbox from "@mui/material/Checkbox";

function Buy() {
  const label = {inputProps: {"aria-label": "Checkbox demo"}};
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Cencel order
      </div>
      <div className={styles.buy_info}>
        <p className={styles.desc}>
          We are glad that you liked our products and considering to buy them.
        </p>
        <p className={`${styles.desc} mt-8`}>Select products to buy</p>
        <div className="product_to_buy_wrapper">
          {[1, 2, 3]?.map((item, index) => (
            <div key={index.toString()} className={"buy_checkbox_info"}>
              <Checkbox {...label} />
              <img src="" className={styles.product_imge_thambnil} />
              <p className={styles.desc}>Jane Queen Size Bed</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className={styles.desc}>Your comment (optional)</p>
          <input
            type="text"
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
          />
        </div>
        <div className={styles.bottom_row}>
          <button className={styles.proceed_btn}>
            Create request <ForwardArrowWithLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Buy;
