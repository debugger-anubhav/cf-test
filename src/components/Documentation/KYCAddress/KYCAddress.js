import React from "react";
import styles from "./KYCAddress.module.css";
import commonStyles from "../common.module.css";
import Image from "next/image";
import forwardArrow from "@/assets/common_icons/proceedArrow.svg";
import uploading from "@/assets/common_icons/uploading.jpg";
import {cityUrl} from "../../../../appConfig";
import DropDown from "../DropDown/DropDown";

const KYCAddress = () => {
  return (
    <div>
      <div className={`${styles.stepHeading}`}>
        <span className={`${commonStyles.formStepHeading}`}>Step 1</span>
      </div>
      <div className={`${styles.formHeadingFirst}`}>
        <span className={`${commonStyles.formHeadings}`}>
          We will fetch your credit score for free to verify your KYC
        </span>
      </div>
      <div className={`${styles.formHeadingSecond}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Alternative number
        </span>
      </div>
      <div className={`${styles.formInputFirst} sm:w-[505px]`}>
        <div className={`flex gap-2 items-center ${styles.form_input} `}>
          <img src={`${cityUrl + "india-icon.svg"}`} className={styles.flag} />
          <input
            type="number"
            // readOnly
            name="contactNumber"
            placeholder="Enter 10 digit number "
            className={styles.contact_input}
          />
        </div>
      </div>
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Permanent address proof
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown options={[]} />
      </div>
      <div className={`${styles.formInputFirst}`}>
        <label
          htmlFor="addressProof"
          className={`${commonStyles.basicInputStyles} md:w-[232px] block`}>
          <Image
            src={uploading}
            alt="Uploading Icon"
            className="inline-block"
          />
          <span className="inline-block pl-2">Choose file</span>
        </label>
        <input
          type="file"
          id="addressProof"
          style={{display: "none"}}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>
      <div className={`${styles.formHeadingThird}`}>
        <span className={`${commonStyles.formHeadings}`}>
          Current address proofs
        </span>
      </div>
      <div className={`${styles.formInputFirst}`}>
        <DropDown options={[]} />
      </div>
      <div className={`${styles.formInputFirst}`}>
        <label
          htmlFor="currrentAdd"
          className={`${commonStyles.basicInputStyles} md:w-[232px] block`}>
          <Image
            src={uploading}
            alt="Uploading Icon"
            className="inline-block"
          />
          <span className="inline-block pl-2">Choose file</span>
        </label>
        <input
          type="file"
          id="currrentAdd"
          style={{display: "none"}}
          //   className={`${commonStyles.basicInputStyles} ${commonStyles.basicFileInput}`}
        />
      </div>
      <div>
        <div className={`${styles.formTermsSection}`}>
          <input type="checkbox" className={`${commonStyles.basicCheckBox}`} />
          <span className={`${commonStyles.termsTxt}`}>
            &nbsp;I accept &nbsp;
          </span>
          <span className={`${commonStyles.termsTxt} text-[#5774AC] underline`}>
            &nbsp;Terms and Conditions
          </span>
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
            <span> Proceed</span>
            <Image src={forwardArrow} alt="Forward Arrow Icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCAddress;
