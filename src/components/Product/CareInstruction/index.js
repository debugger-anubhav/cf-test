import React from "react";
import styles from "./style.module.css";
import {HomePageImages} from "@/assets/images";

const CareInstruction = () => {
  const arr = [
    {
      img: HomePageImages.office,
      head: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Vitae non sodales sit tempus egestas rhoncus risus morbi aliquam. Facilisi sagittis venenatis risus.",
    },
    {
      img: HomePageImages.office,
      head: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Vitae non sodales sit tempus egestas rhoncus risus morbi aliquam. Facilisi sagittis venenatis risus.",
    },
    {
      img: HomePageImages.office,
      head: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Vitae non sodales sit tempus egestas rhoncus risus morbi aliquam. Facilisi sagittis venenatis risus.",
    },
    {
      img: HomePageImages.office,
      head: "Lorem ipsum dolor sit amet",
      desc: "Lorem ipsum dolor sit amet consectetur. Vitae non sodales sit tempus egestas rhoncus risus morbi aliquam. Facilisi sagittis venenatis risus.",
    },
  ];
  return (
    <div className={styles.main_container}>
      <h2 className={styles.head}>Care Instructions</h2>
      <div className={styles.card_wrapper}>
        {arr?.map((item, index) => (
          <div key={index.toString()}>
            <img src={item.img} className={styles.img} alt="card_img" />
            <p className={styles.card_head}>{item.head}</p>
            <p className={styles.card_desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareInstruction;
