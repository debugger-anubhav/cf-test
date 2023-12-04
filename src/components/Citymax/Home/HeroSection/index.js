import React, {useState} from "react";
import styles from "./styles.module.css";

const HeroSection = () => {
  const [isHalfYearly, setHalfYearly] = useState(true);
  const arr = [
    {
      head: "CityMax Ultra",
      desc: "Best suited for a 3BHK apartment",
      offer: "13 products @ just",
      price: "6779",
    },
    {
      head: "CityMax Ultra",
      desc: "Best suited for a 3BHK apartment",
      offer: "13 products @ just",
      price: "6779",
    },
    {
      head: "CityMax Ultra",
      desc: "Best suited for a 3BHK apartment",
      offer: "13 products @ just",
      price: "6779",
    },
    {
      head: "CityMax Ultra",
      desc: "Best suited for a 3BHK apartment",
      offer: "13 products @ just",
      price: "6779",
    },
    {
      head: "CityMax Ultra",
      desc: "Best suited for a 3BHK apartment",
      offer: "13 products @ just",
      price: "6779",
    },
  ];
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>
        Rent <span className={styles.max}>MAX</span>, pay less.
      </h1>
      <p className={styles.tag_line}>
        Simple plans for complete home furnishing
      </p>

      <div className={styles.center}>
        <div className={styles.monthly_toggler}>
          <p
            onClick={() => {
              setHalfYearly(true);
            }}
            className={`${
              isHalfYearly
                ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                : "bg-transparent"
            } ${styles.pref_mode_text}`}>
            6 months
          </p>
          <p
            onClick={() => {
              setHalfYearly(false);
            }}
            className={`${
              isHalfYearly
                ? "bg-transparent"
                : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
            } ${styles.pref_mode_text}`}>
            12 months
          </p>
        </div>
      </div>

      <div className={`${styles.center} ${styles.card_wrapper}`}>
        {arr.map((item, index) => (
          <div key={index} className={styles.card}>
            <p className={styles.card_head}>{item.head}</p>
            <p className={styles.card_desc}>{item.desc}</p>
            <p className={styles.card_offer}>{item.offer}</p>
            <p className={styles.card_price}>
              <span className={styles.rupeeIcon}>₹</span>
              {item.price}/mo
            </p>
            <button className={styles.btn}>Select plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
