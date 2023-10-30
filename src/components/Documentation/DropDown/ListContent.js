import React from "react";
import styles from "./DropDown.module.css";

const ListContent = ({
  // handleSelectChange,
  // selectedOption,
  // style,
  // useDefaultStyle,
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
    <div>
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

export default ListContent;
