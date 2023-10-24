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
              className={styles.card}
              key={index.toString()}
              // style={{background:`url(${item.bg})`}}
            >
              {/* {item?.title} */}
              <img src={item.bg} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
