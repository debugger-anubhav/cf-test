import React from "react";
import styles from "./style.module.css";
import {AboutUs} from "@/assets/images";
const data = {
  heading: "What We Want To Achieve?",
  ans: "We aim to provide a commitment-free furniture rental experience by allowing users to switch furniture regularly and live a flexible lifestyle at affordable costs. ",
};

const CompanyGoal = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.content_wrapper}>
        <div className={styles.heading_wrapper}>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={`${styles.ans_text} hidden ms:flex lg:jusitfy-start`}>
            {data.ans}
          </p>
        </div>
        <div className={`${styles.ans_wrapper} ms:justify-start`}>
          <p className={`${styles.ans_text} ms:hidden`}>{data.ans}</p>
          <img
            className={styles.illustration_img}
            src={`${AboutUs}/icons/illustration-target.svg`}
            alt="illustration-target"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyGoal;
