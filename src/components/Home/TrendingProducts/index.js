import React from "react";
import styles from "./style.module.css";
import {TrendingProduct} from "@/constants/constant";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

const TrendingProducts = () => {
  return (
    <div>
      <div className="mb-4">
        <div className={styles.heading_container}>
          <h2 className={styles.Heading}>{TrendingProduct.heading}</h2>
          <div className={styles.arrow_container}>
            <div className={styles.LeftArrow}>
              <BiChevronLeft size={"2.4rem"} />
            </div>
            <div className={styles.LeftArrow}>
              <BiChevronRight size={"2.4rem"} fontSize={"5rem"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TrendingProducts;
