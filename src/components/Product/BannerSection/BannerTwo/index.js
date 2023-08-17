import React from "react";
import styles from "./style.module.css";
import bg from "../bgBanner.svg";
import Image from "next/image";

const BannerTwo = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.img_wrapper}>
        <Image
          className={styles.img}
          src={bg}
          alt="banner_img"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
};

export default BannerTwo;
