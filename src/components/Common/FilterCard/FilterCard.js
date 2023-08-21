import React from "react";
import style from "./style.module.css";
import {CloseOutline} from "@/assets/icon";

const FilterCard = ({text}) => {
  return (
    <div className={style.main_container}>
      <CloseOutline color={"#597492"} />
      <p className={style.filter_card_text}>{text}</p>
    </div>
  );
};

export default FilterCard;
