import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {RentNowBannerImages} from "@/constants/constant";

const RentNowBanner = () => {
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
