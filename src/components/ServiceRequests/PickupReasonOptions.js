import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";
import PickupReasonCommonScreen from "./PickupReasonCommonScreen";

function PickupReasonOptions({setScreen, selectedProducts, data}) {
  const [selectedPickupReason, setSelectedPickupReason] = useState(null);
  const [showCommonPickupScreen, setShowCommonPickupScreen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);

  const PickupReasons = [
    {title: "Faced problems in service", btnName: "Repair product(s)"},
    {title: "Faced problems in products", btnName: "Repair product(s)"},
    {title: "Moving out of country", btnName: "Ownership transfer"},
    {title: "Moving to other city", btnName: "Relocation"},
    {title: "Want to purchase things now", btnName: "Buy product(s)"},
    {title: "Moving to fully furnished property", btnName: "Buy product(s)"},
    {title: "Did not like the products", btnName: "Swap product(s)"},
    {title: "Requirement Fulfilled", btnName: "Create request"},
    {title: "Other", btnName: "Create request"},
  ];

  return (
    <>
      {showCommonPickupScreen && currentScreen === 2 ? (
        <PickupReasonCommonScreen
          reason={selectedPickupReason}
          subTitle={"We are sorry to hear that. This is what we can offer."}
          setCurrentScreen={setCurrentScreen}
          selectedProducts={selectedProducts}
          data={data}
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
                    <p className={styles.request_type}>{item.title}</p>
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
