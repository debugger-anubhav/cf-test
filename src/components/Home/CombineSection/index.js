"use client";
import React from "react";
import PartnershipBanner from "../PartnershipBanner";
import FourSteps from "../FourSteps";
import ChatWithUs from "../ChatWithUs";
import {Skeleton} from "@mui/material";
import styles from "./styles.module.css";
import {useSelector} from "react-redux";

const CombineSection = () => {
  const data = useSelector(state => state.contentful.fourStepsData);
  const banner = useSelector(state => state.contentful.fourStepsBanner);
  const bannerUrl = banner[0].mediaData[0].url;
  console.log(data.mediaData, "datata");
  return (
    <div className=" pb-20 pt-12 w-full flex md:px-[70px] xl:px-[90px] macbook:px-[122px] 3xl:px-[160px] gap-4  lg:flex-row flex-col px-4">
      <div className="2xl:w-[40%] lg:w-[50%] w-full flex ">
        <PartnershipBanner bannerUrl={bannerUrl} />
      </div>
      <div className="flex w-full flex-col">
        <FourSteps data={data} />
        <ChatWithUs />
      </div>
    </div>
  );
};

export default CombineSection;

export const CombineSectionSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
      </div>
      <div className={styles.right}>
        <div className={styles.right_first_skeleton}>
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
        <div className={styles.left_first_skeleton}>
          <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
};
