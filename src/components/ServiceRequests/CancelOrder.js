import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import Select from "react-select";

import {CreateRequest, CreateRequestPayload} from "@/constants/constant";
import {useDispatch, useSelector} from "react-redux";
import {setServiceRequestDrawer} from "@/store/Slices";

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

function CencelOrder({prevScreen, data}) {
  const dispatch = useDispatch();
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const cencellationOptions = [
    {value: "1", label: "Wrong items selected"},
    {value: "2", label: "Late delivery"},
    {value: "3", label: "Want to buy items"},
    {value: "4", label: "Items not required anymore"},
    {value: "5", label: "Other"},
  ];

  const [selected, setSelected] = useState(null);
  const [description, setDescription] = useState("");

  const handleChange = selectedOption => {
    setSelected(selectedOption);
  };

  const handleRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      Possible_Values: selected.label,
      type: selectedType,
      description,
    };
    CreateRequest(payload);
    dispatch(setServiceRequestDrawer(false));
  };

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Cancel order
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
          onChange={e => setDescription(e.target.value)}
        />
        <button
          className={`${styles.proceed_btn}  !w-fit ${
            selected === null ? "!bg-[#FFDF85] !cursor-not-allowed" : ``
          }`}
          onClick={handleRequest}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default CencelOrder;