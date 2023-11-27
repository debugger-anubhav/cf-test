import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import Select from "react-select";

export const customStylesForSelect = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    padding: "4px 16px",
    borderRadius: "12px",
    outline: "none",
    cursor: "pointer",
    ".css-1u9des2-indicatorSeparator": {
      display: "none",
    },
    border: "1px solid  #DDDDDF",
    boxShadow: 0,
    "&:hover": {
      border: "1px solid #71717A",
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? "#5774AC" : "#222",
    backgroundColor: state.isSelected ? "#EFF5FF" : "#fff",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#EFF5FF",
      color: "#5774AC",
    },
    fonetSize: "16px",
    borderBottom: "1px solid #DDDDDF",
  }),
};

function CencelOrder() {
  const cencellationOptions = [
    {value: "1", label: "Wrong items selected"},
    {value: "2", label: "Late delivery"},
    {value: "3", label: "Want to buy items"},
    {value: "4", label: "Items not required anymore"},
    {value: "5", label: "Other"},
  ];

  const [selected, setSelected] = useState(null);

  const handleChange = selectedOption => {
    setSelected(selectedOption);
    console.log(selected);
  };

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Cencel order
      </div>
      <div className={styles.cancellation_info}>
        <Select
          options={cencellationOptions}
          styles={customStylesForSelect}
          onChange={handleChange}
          placeholder="Reason for cancellation"
        />

        <p className={styles.form_label}>Your comment (optional)</p>
        <input
          type="text"
          placeholder="Please share any specific instructions or provide feedback."
          className={styles.form_input_textarea}
        />
        <button className={`${styles.proceed_btn} !w-fit`}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default CencelOrder;
