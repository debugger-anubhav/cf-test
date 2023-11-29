import React from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";

function PickupReasonCommonScreen({title, subTitle}) {
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        {title}
      </div>
      <div className={styles.buy_info}>
        <p className={styles.desc}>{subTitle}</p>
      </div>
      {(title === "Other" || title === "Requirement Fulfilled") && (
        <div>
          <p className={styles.desc}>Your comment (optional)</p>
          <input
            type="text"
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
          />
        </div>
      )}

      <button className={styles.proceed_btn}>
        Repair product(s)
        <ForwardArrowWithLine />
      </button>

      {title !== "Other" && title !== "Requirement Fulfilled" ? (
        <button className={`${styles.plain_btn} !mt-0`}>
          No, let me proceed with pickup <ForwardArrowWithLine />
        </button>
      ) : null}
    </div>
  );
}

export default PickupReasonCommonScreen;
