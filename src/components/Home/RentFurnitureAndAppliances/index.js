import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {RentFurniture} from "@/constants/constant";
import Image from "next/image";

const RentFurnitureAndAppliances = () => {
  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
      <div className={styles.card_div}>
        {RentFurniture.map((item, index) => (
          <div key={index}>
            <div className="relative">
              <Image src={item.img} alt="" className={styles.img} />
              <div className={styles.pricetag}>
                <p className={styles.price}>Starting from</p>
                <p className={styles.price}>
                  <span className={styles.span}>{item.pricetag}</span>
                  month
                </p>
              </div>
            </div>
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
