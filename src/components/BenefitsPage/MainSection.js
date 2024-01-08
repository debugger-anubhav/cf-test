import React from "react";
import styles from "./style.module.css";
import {BenefitPageData} from "@/constants/constant";

function MainSection() {
  return (
    <div className={styles.wrapper}>
      <div className="flex">
        <div className={styles.card_wrapper}>
          {BenefitPageData?.map((item, index) => {
            return (
              <div key={index.toString()} className="relative">
                <div className="sm:flex hidden">
                  <img
                    src={
                      "https://d3juy0zp6vqec8.cloudfront.net/images/icons/frame-about-us.webp"
                    }
                    alt={item.Heading}
                    className="max-w-[320px] max-h-[194px]"
                  />
                  <div className={styles.detail_wrapper}>
                    <img src={item.icon} className="mb-6 w-11 h-11" />
                    <h3 className={`${styles.heading} mb-2 tracking-[-0.4px]`}>
                      {item.Heading}
                    </h3>
                    <p className={styles.detail}>{item.text}</p>
                  </div>
                </div>
                <div className="sm:hidden flex">
                  <div className={styles.responsive_deatil_wrapper}>
                    <img
                      src={item.updatedMobileIcon}
                      className={styles.responsive_icon}
                      alt={item.Heading}
                    />
                    <p className={`${styles.heading} tracking-[-0.4px]`}>
                      {item.Heading}
                    </p>
                    <p className={`${styles.detail} pt-1`}>{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainSection;
