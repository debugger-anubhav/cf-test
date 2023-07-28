import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Heart} from "@/assets/icon";

const Card = ({
  desc,
  currentPrice,
  originalPrice,
  discount,
  showincludedItem,
  cardImage,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className="relative">
        <Image
          // src={HomePageImages.cardThumbnail}
          src={cardImage}
          alt="thumbnail image"
          className={styles.thumbnail}
          width={241}
          height={181}
        />
        {/* ----------- */}
        {showincludedItem && (
          <div className={styles.item_included_container}>
            <p className={styles.item_icluded_text}>5 items included</p>
          </div>
        )}
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
