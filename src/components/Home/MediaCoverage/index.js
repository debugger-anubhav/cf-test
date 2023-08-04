import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {MediaCoverageImages} from "@/constants/constant";

const MediaCoverage = () => {
  const str = string.landing_page.Media_coverage;

  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h1 className={styles.heading}>{str.desc}</h1>
      <div className={styles.demo}>
        <div className={styles.icons_div}>
          {MediaCoverageImages?.map((item, index) => (
            <img key={index} className={styles.icon} src={item?.img} alt="" />
          ))}
        </div>
        <div className={styles.icons_div}>
          {MediaCoverageImages?.map((item, index) => (
            <img key={index} className={styles.icon} src={item?.img} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MediaCoverage;
