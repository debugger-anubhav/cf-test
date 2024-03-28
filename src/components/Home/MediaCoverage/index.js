import React from "react";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";

const MediaCoverage = () => {
  const str = string.landing_page.Media_coverage;
  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h2 className={`${styles.heading} mb-8`}>{str.desc}</h2>

      <div className={`${styles.ticker_container} gap-12`}>
        {MediaCoverageImages?.map((imageUrl, index) => (
          <>
            <div className={`w-100 h-100 absolute z-10`} />
            <div
              key={index.toString()}
              className="flex items-center py-[16px] !min-w-[124px] md:!min-w-[147px] lg:!min-w-max  relative"
              aria-hidden="true">
              <img
                src={imageUrl.img}
                alt={imageUrl.alt}
                className="flex items-center w-full mix-blend-darken md:mix-blend-normal"
                loading="lazy"
                width="100%"
                height="100%"
              />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default MediaCoverage;
