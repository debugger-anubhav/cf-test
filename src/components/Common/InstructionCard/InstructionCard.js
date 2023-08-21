import React from "react";
import style from "./style.module.css";

const InstructionCard = () => {
  return (
    <div className={style.card_container}>
      <div className={style.image_wrapper}>
        <img src="https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp" />
      </div>
      <div className={style.text_container}>
        <p className={style.heading}>Regular Maintenance</p>
        <p className={style.content}>
          Polish your furniture from time to time. Apply natural beeswax polish
          for a premium finish. Use a dry cloth and buff up, removing excess
          wax.
        </p>
      </div>
    </div>
  );
};

export default InstructionCard;
