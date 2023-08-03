import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {FourStepsCardData} from "@/constants/constant";

// h2 p h3 p

const FourSteps = () => {
  return (
    <div className={styles.four_steps_wrapper}>
      <h2 className={styles.head}>{string.landing_page.Four_steps.heading}</h2>
      <p className={styles.subhead}>{string.landing_page.Four_steps.subhead}</p>
      <div className={styles.card_wrapper}>
        {FourStepsCardData?.map((itemm, index) => (
          <div key={index} className={styles.card}>
            <div>
              <img
                src={itemm?.img1}
                className={`${
                  index === 0
                    ? "w-[80px] h-[80px]"
                    : index === 1
                    ? "w-[85px] h-[80px]"
                    : index === 2
                    ? "w-[137px] h-[73.5px]"
                    : "w-[161px] h-[70px]"
                } lg:flex hidden`}
              />
              <img
                src={itemm.img2}
                className={`w-[165px] h-[120px] lg:hidden flex`}
              />
            </div>
            <h3 className={styles.head1}>{itemm?.head}</h3>
            <p className={styles.content1}>{itemm?.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FourSteps;
