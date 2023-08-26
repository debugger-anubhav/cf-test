import React from "react";
import style from "./style.module.css";
// import { CloseOutline } from "@/assets/icon";
import {IoClose} from "react-icons/io5";

const FilterCard = ({text}) => {
  return (
    <div className={style.main_container}>
      <IoClose color={"#597492"} size={"16px"} />
      <p className={style.filter_card_text}>{text}</p>
    </div>
  );
};

export default FilterCard;
