import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {RentFurniture} from "@/constants/constant";
import Image from "next/image";

const RentFurnitureAndAppliances = () => {
  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <div className={styles.card_div}>
        {RentFurniture.map((item, index) => (
          <div key={index}>
            <Image src={item.img} alt="" className={styles.img} />
            <p className={styles.label}>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RentFurnitureAndAppliances;
