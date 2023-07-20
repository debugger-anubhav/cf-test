import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {HomePageImages} from "@/assets/images";
import {Heart} from "@/assets/icon";

const Card = ({desc, currentPrice, originalPrice, discount}) => {
  return (
    <div className={styles.wrapper}>
      <div>
        <Image
          src={HomePageImages.cardThumbnail}
          alt="thumbnail image"
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.desc_div}>
        <h3 className={styles.desc}>{desc}</h3>
        <Heart size={25} color={"#C0C0C6"} />
      </div>
      <div className={styles.price_div}>
        <div className="flex gap-[0.62rem] items-center">
          <h3 className={styles.currentPrice}>{currentPrice}</h3>
          <h3 className={styles.originalPrice}>{originalPrice}</h3>
        </div>
        <div className={styles.discount}>{discount}</div>
      </div>
    </div>
  );
};

export default Card;
