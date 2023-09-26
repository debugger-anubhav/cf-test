import React, {useState} from "react";
import styles from "./DropDown.module.css";
import downArrowDD from "@/assets/common_icons/downArrowDD.svg";
import upArrowDD from "@/assets/common_icons/upArrowDD.svg";
import Image from "next/image";
const DropDown = ({
  handleSelectChange,
  // selectedOption,
  style,
  useDefaultStyle,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = option => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div
      className={`${styles["custom-select"]} ${isOpen ? "active" : ""}`}
      style={isOpen ? {} : {boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)"}}>
      <div
        className={`${styles["selected-option"]} ${
          !isOpen ? "border-none" : "!border-[#DDDDDF]"
        }`}
        onClick={() => setIsOpen(!isOpen)}>
        <span> {selectedOption || "Select an option"}</span>
        <div className={`${styles.ddArrow}`}>
          {isOpen ? (
            <Image src={downArrowDD} className={`${styles.ddArrow}`} />
          ) : (
            <Image src={upArrowDD} className={`${styles.ddArrow}`} />
          )}
        </div>
      </div>
      <ul className={isOpen ? styles.options : styles.optionsActive}>
        {options.map((option, index) => (
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
