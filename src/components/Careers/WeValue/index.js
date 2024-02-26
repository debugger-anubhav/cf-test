import React from "react";
import styles from "./style.module.css";
import {Career} from "@/assets/images";

export default function WeValue() {
  const Data = [
    {
      title: "Expert insights",
      bg: Career + "/expert-insights.webp",
    },
    {
      title: "Bold ideas",
      bg: Career + "/bold-ideas.webp",
    },
    {
      title: "Intellectual courage",
      bg: Career + "/intellectual-courage.webp",
    },
    {
      title: "Creativity",
      bg: Career + "/creativity.webp",
    },
  ];
  return (
    <div className={styles.wrapper}>
      <p className={styles.heading}>We value</p>
      <div className={styles.card_wrapper}>
        {Data?.map((item, index) => {
          return (
            <div
              className={`${styles.card} ${
                index !== Data.length - 1 ? "lg:mr-6 mr-4" : "mr-0"
              }`}
              key={index.toString()}>
              <img
                src={item.bg}
                alt={item.title}
                className={"w-full"}
                loading="lazy"
              />
              <p className={styles.bottom_left}>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
