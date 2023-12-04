import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";
import PickupReasonCommonScreen from "./PickupReasonCommonScreen";

function PickupReasonOptions({setScreen}) {
  const [selectedPickupReason, setSelectedPickupReason] = useState(null);
  const [showCommonPickupScreen, setShowCommonPickupScreen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);

  const PickupReasons = [
    "Faced problems in service",
    "Faced problems in products",
    "Moving out of country",
    "Moving to other city",
    "Want to purchase things now",
    "Moving to fully furnished property",
    "Did not like the products",
    "Requirement Fulfilled",
    "Other",
  ];
  return (
    <>
      {showCommonPickupScreen && currentScreen === 2 ? (
        <PickupReasonCommonScreen
          title={selectedPickupReason}
          subTitle={"We are sorry to hear that. This is what we can offer."}
          setCurrentScreen={setCurrentScreen}
        />
      ) : (
        <div className={styles.content_wrapper}>
          <div className={styles.main_heading}>
            <BackIcon
              onClick={() => setScreen(1)}
              className={"cursor-pointer"}
            />
            Pickup reason
          </div>

          <div className={` my-6 flex w-full flex-col mt-4`}>
            {PickupReasons?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={` ${
                    index !== PickupReasons.length - 1
                      ? " border-b border-EDEDEE"
                      : "border-0"
                  } ${styles.request_info_div}`}
                  onClick={() => {
                    setSelectedPickupReason(item);
                    setShowCommonPickupScreen(true);
                    setCurrentScreen(2);
                  }}>
                  <div className="flex gap-2 items-center">
                    <p className={styles.request_type}>{item}</p>
                  </div>
                  <div className="flex">
                    <ForwardArrow />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default PickupReasonOptions;
