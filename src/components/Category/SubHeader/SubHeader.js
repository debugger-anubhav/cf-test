import React from "react";
import styles from "./style.module.css";

const SubHeader = () => {
  return (
    <div className={styles.conatiner_wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <p className={styles.route_text}>Home</p>
            <div className={styles.arrow}></div>
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>Home Furniture</p>
            <div className={styles.arrow}></div>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading}>
        Single & Double Bed On Rent In Noida And Ghaziabad, Bedroom Furniture
        Rental
      </h1>
      <div className={styles.category_wrapper}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <div
              className={styles.category_container_box}
              key={index.toString()}>
              <div className="">icon</div>
              <p className={styles.category_container}>Home furniture</p>
            </div>
          );
        })}
      </div>
      <div>
        <div className={styles.category_container}>ddd</div>
        <p className={styles.category_container}>Home furniture</p>
      </div>
    </div>
  );
};

export default SubHeader;
