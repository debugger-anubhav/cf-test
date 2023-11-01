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
  maxWidth,
  optionsActive,
  isInitialScreen = false,
  handleKycState,
}) => {
  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsDDOpen(false);
    isInitialScreen && handleKycState(option);
  };
  return (
    <div
      className={`${styles["custom-select"]} ${isOpen ? "active" : ""}`}
      // style={isOpen ? {boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"} : {}}
      style={{
        maxWidth,
        boxShadow: isOpen ? "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" : "",
      }}>
      <div
        className={`mt-1 ${styles["selected-option"]} ${
          isOpen ? "border-none" : "!border-[#DDDDDF]"
        }`}
        onClick={() => {
          setIsDDOpen(prev => !prev);
        }}>
        <span
          className={` ${styles.selected_txt} ${
            selectedOption?.value || selectedOption?.dealCodeNumber
              ? "text-black"
              : "text-[#71717A]"
          }`}>
          {isInitialScreen
            ? selectedOption?.dealCodeNumber || "Select order"
            : selectedOption?.label || "Select an option"}
        </span>
        <div className={`${styles.ddArrow}`}>
          {isOpen ? (
            <PopUpArrow size={25} className={`${styles.pointer}`} />
          ) : (
            <DownPopUpArrow size={25} className={`${styles.pointer}`} />
          )}
        </div>
      </div>

      <ul
        className={`${
          isOpen ? optionsActive : styles.options
        } max-h-[260px] overflow-scroll`}>
        {options?.map((option, index) => (
          <li
            className={`${styles.option} ${
              index === options.length - 1 ? "rounded-b-xl border-none" : ""
            } ${index === 0 ? "border-t" : ""}`}
            key={index}
            onClick={() => handleOptionClick(option)}>
            {isInitialScreen ? option.dealCodeNumber : option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
