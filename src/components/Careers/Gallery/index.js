import React from "react";
import styles from "./style.module.css";
import {CareerGallery, CareerGalleryMobile} from "../../../assets/images";

export default function Gallery() {
  return (
    <>
      <div className={`${styles.wrapper} hidden lg:flex`}>
        {/* //first column */}
        <div className={styles.first_col}>
          <img
            src={CareerGallery.first}
            alt="life at cityfurnish"
            className={styles.first_image}
            loading="lazy"
          />
          <img
            src={CareerGallery.second}
            alt="life at cityfurnish"
            className={styles.second_image}
            loading="lazy"
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
                loading="lazy"
              />

              <img
                src={CareerGallery.fourth}
                alt="life at cityfurnish"
                className={styles.gallery_image_4}
                loading="lazy"
              />
            </div>
            <div className={styles.second_top_col_2}>
              <img
                src={CareerGallery.fivth}
                alt="life at cityfurnish"
                className={styles.gallery_image_5}
                loading="lazy"
              />
            </div>
          </div>
          <div className={styles.second_bottom}>
            <div className={styles.gallery_image_3}>
              <img
                src={CareerGallery.third}
                alt="life at cityfurnish"
                className={styles.img_gallery}
                loading="lazy"
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
              loading="lazy"
            />
          </div>
          <div className={styles.gallery_image_8}>
            <img
              src={CareerGallery.eight}
              alt="life at cityfurnish"
              className={styles.img_gallery}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div className={`${styles.wrapper} flex lg:hidden w-full h-full`}>
        <img
          src={CareerGalleryMobile.first}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
        <img
          src={CareerGalleryMobile.second}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
        <div className={"flex w-full h-full gap-2"}>
          <div className="w-1/2 flex">
            <img
              src={CareerGalleryMobile.sixth}
              alt="life at cityfurnish"
              loading="lazy"
            />
          </div>
          <div className="w-1/2 flex">
            <img
              src={CareerGalleryMobile.fourth}
              alt="life at cityfurnish"
              loading="lazy"
            />
          </div>
        </div>

        <img
          src={CareerGalleryMobile.eight}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
        <img
          src={CareerGalleryMobile.third}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
        <img
          src={CareerGalleryMobile.fivth}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
        <img
          src={CareerGalleryMobile.seven}
          alt="life at cityfurnish"
          className={styles.mobile_image}
          loading="lazy"
        />
      </div>
    </>
  );
}
