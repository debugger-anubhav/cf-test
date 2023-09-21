import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {ProductPageImages} from "@/assets/images";
import Image from "next/image";

const BenefitsCta = () => {
  const str = string.product_page;
  return (
    <div className={styles.main_container}>
      <div className={styles.head_div}>
        <p className={styles.head}>{str.cta_head}</p>
        <img
          src={ProductPageImages.LeafIcon}
          className={styles.leaf_icon}
          loading="lazy"
          alt="LeafIcon"
        />
      </div>
      <p className={styles.desc}>{str.cta_desc}</p>
      <div className={styles.bg_img}>
        {/* <img src={ProductPageImages.CtaImage} /> */}
        <Image
          className="w-ful h-full"
          src={ProductPageImages.CtaImage}
          alt="benefits"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default BenefitsCta;
