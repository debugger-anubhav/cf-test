import React from "react";
import styles from "./style.module.css";

export default function WeValue() {
  const Data = [
    {
      title: "Expert insights",
      bg: "https://d3juy0zp6vqec8.cloudfront.net/images/expert-insights.webp",
    },
    {
      title: "Bold ideas",
      bg: "https://d3juy0zp6vqec8.cloudfront.net/images/bold-ideas.webp",
    },
    {
      title: "Intellectual courage",
      bg: "https://d3juy0zp6vqec8.cloudfront.net/images/intellectual-courage.webp",
    },
    {
      title: "Creativity",
      bg: "https://d3juy0zp6vqec8.cloudfront.net/images/creativity.webp",
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
              <img src={item.bg} alt="Snow" className={"w-full"} />
              <p className={styles.bottom_left}>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
