import React from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import {Data} from "../Data";

function MainSection() {
  const Heading = "Rental Agreement";
  const Subheading =
    'This Subscription Agreement ("Agreement") is made and deemed executed on the date _____________ ("Subscription Date")by the Company at _____________ ("City").';
  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={" Rental Agreement"} />
      <div className={styles.main_heading}>{Heading}</div>
      <div className={styles.detail}>{Subheading}</div>

      <div>
        {Data?.map((item, index) => {
          return (
            <div className={styles.data_box} key={index.toString()}>
              <p className={styles.heading}>{item.heading}</p>
              <p className={styles.detail}>{item.decription}</p>
              {index === Data.length - 1 && (
                <p className={`${styles.detail} !mt-4`}>{item.lastDesc}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainSection;
