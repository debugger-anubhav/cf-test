import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {useSelector} from "react-redux";
import {productPageImagesBaseUrl} from "@/constants/constant";

const BannerThree = () => {
  const bannerImages = useSelector(state => state.productPageData.bannerImages);
  return (
    <div className={styles.main_container}>
      <div className={styles.content_div}>
        <p className={styles.head}>{bannerImages?.[2]?.file_title}</p>
        <p className={styles.desc}>{bannerImages?.[0]?.file_description}</p>
      </div>
      <div className={styles.img_wrapper}>
        <Image
          className={styles.img}
          src={`${productPageImagesBaseUrl + bannerImages?.[2]?.file_name}`}
          alt="banner_img"
          layout="fill"
          objectFit="cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BannerThree;
