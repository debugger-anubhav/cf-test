import React from "react";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {productPageImagesBaseUrl} from "@/constants/constant";

const BannerTwo = () => {
  const bannerImages = useSelector(state => state.productPageData.bannerImages);
  return (
    <div className={styles.main_container}>
      <div className={styles.img_wrapper}>
        <img
          className={styles.img}
          src={`${productPageImagesBaseUrl + bannerImages?.[1]?.file_name}`}
          alt="banner_img"
        />
        <div className={styles.desc_div}>
          <p className={styles.head}>{bannerImages?.[1]?.file_title}</p>
          <p className={styles.desc}>{bannerImages?.[1]?.file_description}</p>
        </div>
      </div>
    </div>
  );
};

export default BannerTwo;
