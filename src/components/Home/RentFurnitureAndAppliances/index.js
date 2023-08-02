import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";

// import {categoryImageBaseUrl} from "@/constants/constant";
import {RentFurniture} from "@/constants/constant";

const RentFurnitureAndAppliances = () => {
  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
      <div className={styles.card_div}>
        {RentFurniture?.map((item, index) => (
          <div key={index} className={styles.card_wrapper}>
            <img
              src={item.img}
              width={"100%"}
              height={"100%"}
              alt=""
              className={styles.img}
            />

            <div className="xl:pl-3 macbook:pl-0">
              <h3 className={styles.label}>{item.label}</h3>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentFurnitureAndAppliances;
