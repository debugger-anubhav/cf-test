import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {HomePageRentNowBanner} from "@/assets/images";

const RentNowBanner = () => {
  const RentNowBannerImages = [
    {img: HomePageRentNowBanner.branded},
    {img: HomePageRentNowBanner.doubleBed},
    {img: HomePageRentNowBanner.studyTable},
    {img: HomePageRentNowBanner.clearanceSale},
    {img: HomePageRentNowBanner.workfromHome},
    {img: HomePageRentNowBanner.checkOut},
  ];
  return (
    <div className={styles.rentNow_Banner_wrapper}>
      <div className={styles.banner_card}>
        {RentNowBannerImages.map((item, index) => (
          <Image key={index} src={item.img} alt="" />
        ))}
      </div>
    </div>
  );
};
export default RentNowBanner;
