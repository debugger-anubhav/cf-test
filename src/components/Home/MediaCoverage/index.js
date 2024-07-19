"use client";
import React, {memo} from "react";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";
import {Skeleton} from "@mui/material";
import Image from "@/components/Image";

const str = string.landing_page.Media_coverage;

const MediaCoverage = () => {
  const MediaCoverageImagesRepeated = Array(10)
    .fill(MediaCoverageImages)
    .flat();
  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h2 className={`${styles.heading} mb-8`}>{str.desc}</h2>

      <div className={`${styles.ticker_container} gap-12`}>
        {MediaCoverageImagesRepeated.map((imageUrl, index) => {
          return (
            <div
              key={(index + 1).toString()}
              className={styles.main_img_wrap}
              aria-hidden="true">
              <Image
                src={imageUrl.img}
                alt={imageUrl.alt + (index + 1)}
                className={styles.media_img}
                width={124}
                height={30}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(MediaCoverage);

export const MediaCoverageSkeleton = memo(() => {
  return (
    <div className={styles.skeleton_wrapper}>
      <Skeleton variant="text" width={120} height={20} />
      <div className={styles.skeleton_map_wrapper}>
        {[1, 2, 3, 4, 4, 5, 5, 3]?.map((item, index) => {
          return (
            <div key={index.toString()} className={styles.main_skele}>
              <Skeleton variant="rectangular" width={"100%"} height={"60%"} />
            </div>
          );
        })}
      </div>
    </div>
  );
});
