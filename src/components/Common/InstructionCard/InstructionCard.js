import React from "react";
import style from "./style.module.css";
import {productPageImagesBaseUrl} from "@/constants/constant";

const InstructionCard = ({item}) => {
  console.log(item, "+++++++++++");
  return (
    <div className={style.card_container}>
      <div className={style.image_wrapper}>
        {/* <img src="https://d3juy0zp6vqec8.cloudfront.net/images/category/bedroom-furniture.webp" /> */}
        src={`${productPageImagesBaseUrl + item?.file_name}`}
      </div>
      <div className={style.text_container}>
        <p className={style.heading}>{item?.title}</p>
        <p
          className={style.content}
          dangerouslySetInnerHTML={{__html: item?.description}}>
          {item?.description}{" "}
        </p>
      </div>
    </div>
  );
};

export default InstructionCard;
