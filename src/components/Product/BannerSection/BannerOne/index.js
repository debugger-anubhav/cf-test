import React from "react";
import styles from "./style.module.css";
import bg from "../bgBanner.svg";
import Image from "next/image";

const BannerOne = () => {
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
      <p className={styles.head}>Lorem ipsum dolor sit amet consectetur.</p>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur. Commodo feugiat vehicula
        parturient tempus lobortis elit faucibus at. Ac justo facilisi varius
        tristique sit sed mauris diam vitae. Lorem ipsum dolor sit amet
        consectetur. Commodo feugiat vehicula parturient tempus lobortis elit
        faucibus at. Ac justo facilisi varius tristique sit sed mauris diam
        vitae.Lorem ipsum dolor sit amet consectetur. Commodo feugiat vehicula
        parturient tempus lobortis elit faucibus at. Ac justo facilisi varius
        tristique sit sed mauris diam vitae.
      </p>
    </div>
  );
};

export default BannerOne;
