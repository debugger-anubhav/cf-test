import React from "react";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {productPageImagesBaseUrl} from "@/constants/constant";

const BannerOne = () => {
  const bannerImages = useSelector(state => state.productPageData.bannerImages);
  if (bannerImages[0]) {
    return (
      <div className={styles.main_container}>
        <div className={styles.img_wrapper}>
          <img
            className={styles.img}
            src={`${productPageImagesBaseUrl + bannerImages?.[0]?.file_name}`}
            alt="banner_img"
          />
        </div>
        <p className={styles.head}>{bannerImages?.[0]?.file_title}</p>
        <p className={styles.desc}>{bannerImages?.[0]?.file_description}</p>
      </div>
    );
  }
};

export default BannerOne;
