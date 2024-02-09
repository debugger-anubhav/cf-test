import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrowWithLine, ToggleOff} from "@/assets/icon";
import {BsToggleOn} from "react-icons/bs";
import {useSelector} from "react-redux";
import {CreateRequestPayload} from "@/constants/constant";
import {CommonCreateRequestApi} from "./CommonCreateRequestApi";

function ChangeBillCycle({prevScreen, data}) {
  const selectedType = useSelector(
    state => state.homePagedata.serviceRequestType,
  );
  const [istoggled, setIstoggled] = useState(true);
  const [description, setDescription] = useState("");
  const {trailCreateSR} = CommonCreateRequestApi();

  const handleCreateRequest = () => {
    const payload = {
      ...CreateRequestPayload,
      deal_id: data[0]?.dealCodeNumber,
      type: selectedType,
      description,
    };
    trailCreateSR(payload);
  };

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon
          onClick={() => prevScreen(true)}
          className={"cursor-pointer"}
        />
        Change bill cycle
      </div>
      <div className={styles.buy_info}>
        <div className="border border-DDDDDF p-4 rounded-lg">
          <div className="flex gap-2 items-center">
            {istoggled ? (
              <BsToggleOn
                color={"#5774AC"}
                size={28}
                onClick={() => setIstoggled(!istoggled)}
                className="cursor-pointer"
              />
            ) : (
              <ToggleOff
                size={28}
                color={"#E3E1DC"}
                onClick={() => {
                  setIstoggled(!istoggled);
                }}
                className="cursor-pointer"
              />
            )}
            <p className={styles.desc}>Align Bill Cycle to 1st day of Month</p>
          </div>
          {!istoggled && (
            <div className="mt-8">
              <p className={styles.desc}>Suggest your preferred start date</p>
              <input
                type="date"
                placeholder="Enter a number"
                className={styles.form_input_textarea}
              />
            </div>
          )}
        </div>
        <div className="mt-8">
          <p className={styles.desc}>Your comment (optional)</p>
          <input
            type="text"
            placeholder="Please share any specific instructions or provide feedback."
            className={styles.form_input_textarea}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <button
          className={`${styles.proceed_btn} !w-fit `}
          // ${!istoggled ? "!bg-[#FFDF85] !cursor-not-allowed" : ``} `
          onClick={() => handleCreateRequest()}>
          Create request <ForwardArrowWithLine />
        </button>
      </div>
    </div>
  );
}

export default ChangeBillCycle;
