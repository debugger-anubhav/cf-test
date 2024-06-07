"use client";
import React from "react";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";
import {Skeleton} from "@mui/material";
// import {useSelector} from "react-redux";
// import Image from "@/components/Image/Image";

const MediaCoverage = () => {
  // const data = useSelector(state => state.contentful.mediaCoverageData);
  // console.log(data, "datata");
  const str = string.landing_page.Media_coverage;
  const MediaCoverageImagesRepeated = Array(10)
    .fill(MediaCoverageImages)
    .flat();
  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h2 className={`${styles.heading} mb-8`}>{str.desc}</h2>

      <div className={`${styles.ticker_container} gap-12`}>
        {MediaCoverageImagesRepeated?.map((imageUrl, index) => {
          return (
            <div
              key={(index + 1).toString()}
              className={styles.main_img_wrap}
              aria-hidden="true">
              <img
                src={imageUrl.img}
                alt={imageUrl.alt + (index + 1)}
                className={styles.media_img}
                loading="lazy"
                width={124}
                height={"100%"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaCoverage;

export const MediaCoverageSkeleton = () => {
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
};
