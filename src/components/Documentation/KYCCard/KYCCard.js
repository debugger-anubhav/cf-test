import React, {useState} from "react";
import styles from "./KYCCard.module.css";
import commonStyles from "../common.module.css";
import SelectionCircle from "../SelectionCircle/SelectionCircle";
import {OutlineArrowRight} from "@/assets/icon";

const KYCCard = () => {
  const [selected, setSelected] = useState("");
  return (
    <div>
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Have no hassle of reminders and payment delays
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Choose your preferred payment mode
        </span>
      </div>
      <div
        className={`${styles.formInputFirst}`}
        onClick={() => {
          setSelected("cc");
        }}>
        <div className={` hidden md:block`}>
          <SelectionCircle showInner={selected === "cc"} />
        </div>
        <div
          type="text"
          className={`${commonStyles.basicInputStyles} ${styles.inputStyles} ${
            selected === "cc" ? "!border-[#71717A]" : ""
          }`}>
          <div className={`md:hidden inline-block mr-2`}>
            <SelectionCircle showInner={selected === "cc"} />
          </div>
          <span> Credit/Debit card</span>
        </div>
      </div>
      <div
        className={`${styles.formInputFirst} `}
        onClick={() => {
          setSelected("net");
        }}>
        <div className={`hidden md:block`}>
          <SelectionCircle showInner={selected === "net"} />
        </div>
        <div
          type="text"
          className={`${commonStyles.basicInputStyles} ${styles.inputStyles} ${
            selected === "net" ? "!border-[#71717A]" : ""
          }`}>
          <div className={`md:hidden inline-block mr-2`}>
            <SelectionCircle showInner={selected === "net"} />
          </div>
          <span> Netbanking</span>
        </div>
      </div>
      <div className={`${styles.btnGroupContainer} `}>
        <div className={`${styles.btnGroup} `}>
          <button
            className={`${commonStyles.laterBtn} ${styles.laterBtn} md:w-[232px] `}>
            I’ll do it later
          </button>
          <button
            disabled
            className={`${commonStyles.saveBtn} ${styles.saveBtn} md:w-[232px] `}>
            <span> Save & proceed</span>
            <OutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCCard;
