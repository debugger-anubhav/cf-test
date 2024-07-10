import React from "react";
import styles from "./styles.module.css";
import {BackIcon, OutlineArrowRight} from "../../../assets/icon";
import {useDispatch} from "react-redux";
import {setKycScreenName} from "@/store/Slices";

export default function ProfessionalDetails() {
  const dispatch = useDispatch();
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => dispatch(setKycScreenName("dashboard"))}
          className={"cursor-pointer"}
        />
        Professional details
      </div>

      <div className={styles.company_detail_wapper}>
        <label className={styles.label}>Company name</label>
        <input
          type="text"
          placeholder="lorem ipsum"
          className={styles.label_input_style}
        />
      </div>
      <div className={styles.company_detail_wapper}>
        <label className={styles.label}>Company name</label>
        <input
          type="text"
          placeholder="lorem ipsum"
          className={styles.label_input_style}
        />
      </div>

      <button className={styles.proceed}>
        proceed
        <OutlineArrowRight color={"#222222"} />
      </button>
    </div>
  );
}
