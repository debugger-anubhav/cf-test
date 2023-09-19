import React from "react";
import styles from "./DropDown.module.css";
const DropDown = ({
  handleSelectChange,
  selectedOption,
  style,
  useDefaultStyle,
  options,
}) => {
  return (
    <div>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleSelectChange}
        className={useDefaultStyle ? styles.main : `${styles.main} ${style}`}>
        <option value="">Select an option</option>
        {options?.map(i => {
          return (
            <option key={i.label} value={i.value}>
              {i.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default DropDown;
