import React from "react";
import styles from "./style.module.css";
import BreadCrumbsCommon from "@/components/Common/BreadCrumbs";
import {BenefitPageData} from "@/constants/constant";

function MainSection() {
  return (
    <div className={styles.wrapper}>
      <BreadCrumbsCommon currentPage={"Benefits"} />
      <div className={styles.main_heading}>Benefits</div>
      <div className="flex">
        <div className={styles.card_wrapper}>
          {BenefitPageData?.map((item, index) => {
            return (
              <div key={index.toString()} className="relative">
                <div className="sm:flex hidden">
                  <img src={item.backgroungImage} alt={item.Heading} />
                  <div className={styles.detail_wrapper}>
                    <p className={styles.heading}>{item.Heading}</p>
                    <p className={styles.detail}>{item.text}</p>
                  </div>
                </div>
                <div className="sm:hidden flex">
                  <div className={styles.responsive_deatil_wrapper}>
                    <img
                      src={item.icon}
                      className={styles.responsive_icon}
                      alt={item.Heading}
                    />
                    <p className={styles.heading}>{item.Heading}</p>
                    <p className={`${styles.detail} mr-4 pt-1`}>{item.text}</p>
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
