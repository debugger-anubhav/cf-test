import React from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";

function PickupReasonCommonScreen({title, subTitle, setCurrentScreen}) {
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => setCurrentScreen(1)}
          className={"cursor-pointer"}
        />
        {title}
      </div>
      <div className={"flex flex-col w-full my-8"}>
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

      <button
        className={`${styles.proceed_btn} ${
          title !== "Other" && title !== "Requirement Fulfilled" ? "!mt-0" : ""
        }`}>
        Repair product(s)
        <ForwardArrowWithLine />
      </button>

      {title !== "Other" && title !== "Requirement Fulfilled" ? (
        <div className="flex justify-center">
          <button className={`${styles.plain_btn} !mt-0 justify-center`}>
            No, let me proceed with pickup <ForwardArrowWithLine />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default PickupReasonCommonScreen;
