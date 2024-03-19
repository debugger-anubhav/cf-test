import React, {useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";
import PickupReasonCommonScreen from "./PickupReasonCommonScreen";

function PickupReasonOptions({
  setScreen,
  selectedProducts,
  data,
  pickupRequestType,
}) {
  const [selectedPickupReason, setSelectedPickupReason] = useState(null);
  const [showCommonPickupScreen, setShowCommonPickupScreen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);

  const PickupReasons = [
    {
      title: "Faced problems in service",
      btnName: "Repair product(s)",
      subTitle: "We are sorry to hear that. This is what we can offer.",
    },
    {
      title: "Faced problems in products",
      btnName: "Repair product(s)",
      subTitle: "We are sorry to hear that. This is what we can offer.",
    },
    {
      title: "Moving out of country",
      btnName: "Ownership transfer",
      subTitle:
        "That’s great news, wish you a happy journey. If you like our services, you can refer to your friends and family.",
    },
    {
      title: "Moving to other city",
      btnName: "Relocation",
      subTitle:
        "We are happy to introduce you our intra or intercity relocation services within our serviceable metro cities.",
    },
    {
      title: "Want to purchase things now",
      btnName: "Buy product(s)",
      subTitle:
        "Buy our ECO-FRIENDLY AND BUYBACK GUARANTEED home furniture at Zior",
    },
    {
      title: "Moving to fully furnished property",
      btnName: "Buy product(s)",
      subTitle:
        "Now you can swap your existing products with our wide range of products/furniture for your new home.",
    },
    {
      title: "Did not like the products",
      btnName: "Swap product(s)",
      subTitle: "We are sorry to hear that. This is what we can offer.",
    },
    {
      title: "Requirement Fulfilled",
      btnName: "Create request",
      subTitle: "Please share your valuable feedback with us.",
    },
    {
      title: "Other",
      btnName: "Create request",
      subTitle: "Please share your valuable feedback with us.",
    },
  ];

  return (
    <div>
      {showCommonPickupScreen && currentScreen === 2 ? (
        <PickupReasonCommonScreen
          reason={selectedPickupReason}
          subTitle={selectedPickupReason.subTitle}
          setCurrentScreen={setCurrentScreen}
          selectedProducts={selectedProducts}
          data={data}
          pickupRequestType={pickupRequestType}
        />
      ) : (
        <div className={`${styles.content_wrapper} !pb-0`}>
          <div className={styles.main_heading}>
            <BackIcon
              onClick={() => setScreen(1)}
              className={"cursor-pointer"}
            />
            Pickup reason
          </div>

          <div className={styles.pickup_reason_opt_wrapper}>
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
                  <div className={styles.pickup_reason_opt}>
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
    </div>
  );
}

export default PickupReasonOptions;
