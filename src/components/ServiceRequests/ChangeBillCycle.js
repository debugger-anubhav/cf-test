import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";

function ChangeBillCycle() {
  const [istoggled, setIstoggled] = useState(false);

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Change bill cycle
      </div>
      <div className={styles.buy_info}>
        <div className="flex gap-2 items-center">
          {istoggled ? (
            <BsToggleOn
              color={"#5774AC"}
              size={28}
              onClick={() => setIstoggled(!istoggled)}
            />
          ) : (
            <ToggleOff
              size={28}
              color={"#E3E1DC"}
              onClick={() => {
                setIstoggled(!istoggled);
              }}
            />
          )}
          <p className={styles.desc}>Align Bill Cycle to 1st day of Month</p>
        </div>
        <div className="mt-8">
          <p className={styles.desc}>Your comment (optional)</p>
          <input
            type="text"
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
          />
        </div>
        <button className={`${styles.proceed_btn} !w-fit`}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default ChangeBillCycle;
