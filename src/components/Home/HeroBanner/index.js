import {HeroBannerText} from "@/constants/constant";
import styles from "./style.module.css";
import React from "react";

const HeroBanner = () => {
  return (
    <div className={styles.hero_banner_wrapper}>
      <div className={styles.banner_container}>
        <div className={styles.heading_container}>
          <h1 className={styles.heading_text}>{HeroBannerText.heading}</h1>
          <div>
            <button className={styles.explor_button}>
              {HeroBannerText.btnText}
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className={styles.rating_text_container}>
          <div className="w-fit flex">
            <div>
              <p className={styles.rating_heading_text}>
                {HeroBannerText.subscriberCount}
              </p>
              <text className={styles.rating_text}>
                {HeroBannerText.subscriber}
              </text>
            </div>
            <div className="ml-2.5 md:ml-10 ">
              <p className={styles.rating_heading_text}>
                {HeroBannerText.Google}
              </p>
              <div className="flex items-center justify-center">
                <text className={styles.rating_text}>
                  {HeroBannerText.stars}
                </text>
                <span className={styles.star_style}></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroBanner;
