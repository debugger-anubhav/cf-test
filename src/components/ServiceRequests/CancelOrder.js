import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine} from "@/assets/icon";
import Select from "react-select";

import {CreateRequestPayload} from "@/constants/constant";
import {useSelector} from "react-redux";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";

export const customStylesForSelect = {
  control: baseStyles => ({
    ...baseStyles,
    padding: "4px 8px",
    borderRadius: "12px",
    outline: "none",
    cursor: "pointer",
    ".css-1u9des2-indicatorSeparator": {
      display: "none",
    },
    boxShadow: 0,
    minHeight: "45px",
    fontSize: "14px",
    color: "#71717A",
    border: "none",
    fontFaimly: "poppins",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#EFF5FF" : "#fff",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#EFF5FF",
      color: "#5774AC",
    },
    fonetSize: "14px",
    color: "#71717A",
    fontFaimly: "poppins",
    "&:placeholder": {
      color: "#71717A",
    },
  }),
  container: provided => ({
    ...provided,
    border: "1px solid #DDDDDF",
    borderRadius: "12px",
    "&:hover": {
      border: "1px solid #71717A",
    },
    fontFaimly: "poppins",
    fontSize: "14px",
  }),
};

function CencelOrder({prevScreen, data}) {
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
  const {CreateSRApiCall} = CommonCreateRequestApi();
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
    CreateSRApiCall(payload);
  };

  return (
    <div className={`${styles.content_wrapper} !pb-0 !overflow-auto`}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Cancel order
      </div>
      <div className={`${styles.cancellation_info} !mb-2`}>
        <Select
          options={cencellationOptions}
          styles={customStylesForSelect}
          onChange={handleChange}
          placeholder="Reason for cancellation"
          isSearchable={false}
        />

        <p className={styles.form_label}>Your comment (optional)</p>
        <textarea
          placeholder="Please share any specific instructions or provide feedback."
          className={styles.form_input_textarea}
          onChange={e => setDescription(e.target.value)}
          rows={2}
        />
        <button
          className={`${styles.proceed_btn}  !w-fit !ml-0 ${
            selected === null ? "!bg-[#FFDF85] !cursor-not-allowed" : ``
          }`}
          onClick={() => handleRequest()}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default CencelOrder;
