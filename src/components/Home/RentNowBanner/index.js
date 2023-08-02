import React from "react";
import styles from "./style.module.css";
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
          <div className={styles.banner_wrapper} key={index.toString()}>
            <img
              src={item.img}
              alt="rant-now-banner-image"
              className={styles.banner_img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentNowBanner;
