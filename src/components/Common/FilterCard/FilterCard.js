import React from "react";
import style from "./style.module.css";
import {CloseOutline} from "@/assets/icon";

const FilterCard = ({text}) => {
  return (
    <div className={style.main_container}>
      <CloseOutline />
      {text}
    </div>
  );
};

export default FilterCard;
