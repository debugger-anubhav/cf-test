import React from "react";
import style from "./style.module.css";
import {HasselFreeData} from "@/constants/constant";

const HasselFreeServicesCards = () => {
  const Title = "Truly hassle free service";
  return (
    <div className={style.main_container}>
      <p className={style.heading}>{Title}</p>
      <div className={style.card_container}>
        {HasselFreeData.map((data, index) => {
          return (
            <div
              key={index.toString()}
              className={style.card_wrapper}
              style={{backgroundImage: ` url("${data.backgroungImage.src}")`}}>
              <div className="absolute bottom-0 px-4">
                <p className={style.heading_text}>{data.Heading}</p>
                <p className={style.content}>{data.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HasselFreeServicesCards;
