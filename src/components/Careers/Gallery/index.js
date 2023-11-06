import React from "react";
import styles from "./style.module.css";
import {CareerGallery} from "../../../assets/images";

export default function Gallery() {
  return (
    <div className={styles.wrapper}>
      {/* //first column */}
      <div className={styles.first_col}>
        <img
          src={CareerGallery.first}
          alt="life at cityfurnish"
          className={styles.first_image}
        />
        <img
          src={CareerGallery.second}
          alt="life at cityfurnish"
          className={styles.second_image}
        />
      </div>

      {/* //second column */}

      <div className={styles.second_col}>
        <div className={styles.second_top}>
          <div className={styles.second_top_col_1}>
            <img
              src={CareerGallery.sixth}
              alt="life at cityfurnish"
              className={styles.gallery_image_6}
            />

            <img
              src={CareerGallery.fourth}
              alt="life at cityfurnish"
              className={styles.gallery_image_4}
            />
          </div>
          <div className={styles.second_top_col_2}>
            <img
              src={CareerGallery.fivth}
              alt="life at cityfurnish"
              className={styles.gallery_image_5}
            />
          </div>
        </div>
        <div className={styles.second_bottom}>
          <div className={styles.gallery_image_3}>
            <img
              src={CareerGallery.third}
              alt="life at cityfurnish"
              className={styles.img_gallery}
            />
          </div>
        </div>
      </div>

      {/* // third column  */}
      <div className={styles.third_col}>
        <div className={styles.gallery_image_7}>
          <img
            src={CareerGallery.seven}
            alt="life at cityfurnish"
            className={styles.img_gallery}
          />
        </div>
        <div className={styles.gallery_image_8}>
          <img
            src={CareerGallery.eight}
            alt="life at cityfurnish"
            className={styles.img_gallery}
          />
        </div>
      </div>
    </div>
  );
}
