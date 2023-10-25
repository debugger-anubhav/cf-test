import React from "react";
import styles from "./style.module.css";

export default function OurLocation() {
  const cities = [
    "Delhi",
    "Bangalore",
    "Pune",
    "Gurgaon",
    "Mumbai",
    "Noida",
    "Hyderabad",
    "Ghaziabad",
  ];
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>Our Locations:</p>
      <div className={styles.list_wrapper}>
        {cities?.map((item, index) => {
          return (
            <li
              className={`${styles.city} ${
                index !== cities.length - 1 ? "lg:mb-4 mb-3" : "mb-0"
              }`}
              key={index.toString()}>
              {item}
            </li>
          );
        })}
      </div>
    </div>
  );
}
