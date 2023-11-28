import React from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow} from "@/assets/icon";

function ServiceRequestType() {
  const orderInfo = [
    {icon: "icon", title: "Cancel order"},
    {icon: "icon", title: "Cancel order"},
    {icon: "icon", title: "Cancel order"},
    {icon: "icon", title: "Cancel order"},
    {icon: "icon", title: "Cancel order"},
    {icon: "icon", title: "Cancel order"},
  ];
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Service request type
      </div>
      <div className={` my-6 flex w-full flex-col mt-4`}>
        {orderInfo?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={` ${
                index !== orderInfo.length - 1
                  ? " border-b border-EDEDEE"
                  : "border-0"
              } ${styles.request_info_div}`}>
              <div className="flex gap-2 items-center">
                <img className={styles.request_type_icon} src="" alt="icon" />
                <p className={styles.request_type}>{item.title}</p>
              </div>
              <div className="flex">
                <ForwardArrow />
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.divider_row}>
        <div className={styles.doted_line}></div>
        <div className={styles.or_text}>OR</div>
        <div className={styles.doted_line}></div>
      </div>
      <div className={`${styles.request_type} mt-7`}>Chat with us</div>
    </div>
  );
}

export default ServiceRequestType;
