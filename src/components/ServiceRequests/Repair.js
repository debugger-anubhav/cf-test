import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";
import {customStylesForSelect} from "./CencelOrder";
import Select from "react-select";

function Repair() {
  const [istoggled, setIstoggled] = useState(false);
  const [toggleIndex, setToggleIndex] = useState(null);
  const [selected, setSelected] = useState(null);

  const repairOptions = [
    {value: "1", label: "Wrong items selected"},
    {value: "2", label: "Late delivery"},
    {value: "3", label: "Want to buy items"},
    {value: "4", label: "Items not required anymore"},
    {value: "5", label: "Other"},
  ];

  const handleChange = selectedOption => {
    setSelected(selectedOption);
    console.log(selected, toggleIndex);
  };

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Repair
      </div>
      <div className={styles.buy_info}>
        <p className={styles.desc}>Select products to repair</p>
        {[1, 2, 3]?.map((item, index) => (
          <div className={styles.repair_info} key={index.toString()}>
            <div className="flex gap-2 items-center">
              {index === toggleIndex && istoggled ? (
                <BsToggleOn
                  color={"#5774AC"}
                  size={28}
                  onClick={() => {
                    setIstoggled(!istoggled);
                    setToggleIndex(index);
                  }}
                />
              ) : (
                <ToggleOff
                  size={28}
                  color={"#E3E1DC"}
                  onClick={() => {
                    setIstoggled(!istoggled);
                    setToggleIndex(index);
                  }}
                />
              )}
              <p className={styles.desc}>Jane Queen Size Bed</p>
            </div>
            {index === toggleIndex && istoggled && (
              <div>
                <div className="mt-4 flex flex-col">
                  <p className={styles.desc}>Reason for repair</p>
                  <Select
                    options={repairOptions}
                    styles={customStylesForSelect}
                    onChange={handleChange}
                    placeholder="Select a reason for repair"
                  />
                </div>
                <div className="mt-4">
                  <p className={styles.desc}>Repair details</p>
                  <input
                    type="text"
                    placeholder="Enter repair details"
                    className={styles.form_input_textarea}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <div className={styles.bottom_row}>
          <button className={styles.proceed_btn}>
            Create request <ForwardArrowWithLine />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Repair;
