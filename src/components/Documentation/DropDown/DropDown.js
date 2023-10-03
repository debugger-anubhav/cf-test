import React from "react";
import styles from "./DropDown.module.css";
import {DownPopUpArrow, PopUpArrow} from "@/assets/icon";
const DropDown = ({
  handleSelectChange,
  selectedOption,
  style,
  useDefaultStyle,
  options,
  setIsDDOpen,
  setSelectedOption,
  isOpen,
}) => {
  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsDDOpen(false);
  };
  return (
    <div
      className={`${styles["custom-select"]} ${isOpen ? "active" : ""}`}
      style={isOpen ? {boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} : {}}>
      <div
        className={`${styles["selected-option"]} ${
          isOpen ? "border-none" : "!border-[#DDDDDF]"
        }`}
        onClick={() => {
          setIsDDOpen(prev => !prev);
        }}>
        <span
          className={`${
            selectedOption?.value ? "text-black" : "text-[#71717A]"
          }`}>
          {selectedOption?.label || "Select an option"}
        </span>
        <div className={`${styles.ddArrow}`}>
          {isOpen ? <PopUpArrow size={25} /> : <DownPopUpArrow size={25} />}
        </div>
      </div>
      <ul className={`${isOpen ? styles.optionsActive : styles.options}  `}>
        {options?.map((option, index) => (
          <li
            className={`${styles.option} ${
              index === options.length - 1 ? "rounded-b-xl border-none" : ""
            } ${index === 0 ? "border-t" : ""}`}
            key={index}
            onClick={() => handleOptionClick(option)}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
