"use client";
import React from "react";
import styles from "./index.module.css";

import {productPageImagesBaseUrl} from "@/constants/constant";
const Banner = ({image}) => {
  React.useEffect(() => {
    console.log(image, "Hello ");
  }, []);
  return (
    <div className={styles.MainContainer}>
      <img
        className={styles.BannerImage}
        src={productPageImagesBaseUrl + image}
        alt="Banner Image"
      />
    </div>
  );
};

export default Banner;
