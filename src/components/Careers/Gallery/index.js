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
          alt="first-image"
          className={styles.first_image}
        />
        <img
          src={CareerGallery.second}
          alt="second-image"
          className={styles.second_image}
        />
      </div>

      {/* //second column */}

      <div className={styles.second_col}>
        <div className={styles.second_top}>
          <div className={styles.second_top_col_1}>
            <img
              src={CareerGallery.sixth}
              alt="sixth-image"
              className={styles.gallery_image_6}
            />

            <img
              src={CareerGallery.fourth}
              alt="fourth-image"
              className={styles.gallery_image_4}
            />
          </div>
          <div className={styles.second_top_col_2}>
            <img
              src={CareerGallery.fivth}
              alt="fivth-image"
              className={styles.gallery_image_5}
            />
          </div>
        </div>
        <div className={styles.second_bottom}>
          <div className={styles.gallery_image_3}>
            <img
              src={CareerGallery.third}
              alt="third-image"
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
            alt="seven-image"
            className={styles.img_gallery}
          />
        </div>
        <div className={styles.gallery_image_8}>
          <img
            src={CareerGallery.eight}
            alt="eight-image"
            className={styles.img_gallery}
          />
        </div>
      </div>
    </div>
  );
}
