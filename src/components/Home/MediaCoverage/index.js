"use client";
import React from "react";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";
import {Skeleton} from "@mui/material";

const MediaCoverage = () => {
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
              className="flex items-center py-[16px] !min-w-[124px] md:!min-w-[147px] lg:!min-w-max  relative"
              aria-hidden="true">
              <img
                src={imageUrl.img}
                alt={imageUrl.alt + (index + 1)}
                className="flex items-center w-full mix-blend-darken md:mix-blend-normal"
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
    <div className="flex w-full flex-col ">
      <Skeleton variant="text" width={120} height={20} />
      <div className="flex w-full overflow-x-scroll gap-4 mt-4">
        {[1, 2, 3, 4, 4, 5, 5, 3]?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className="flex min-w-[100px] md:min-w-[150px] h-[100px] gap-4 mt-4">
              <Skeleton variant="rectangular" width={"100%"} height={"60%"} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
