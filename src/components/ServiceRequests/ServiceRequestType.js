import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow, IconLink} from "@/assets/icon";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

function ServiceRequestType({orderId, isHelpDrawer, title}) {
  const [services, setServices] = useState();
  // const orderInfo = [
  //   {icon: "icon", title: "Cancel order"},
  //   {icon: "icon", title: "Cancel order"},
  //   {icon: "icon", title: "Cancel order"},
  //   {icon: "icon", title: "Cancel order"},
  //   {icon: "icon", title: "Cancel order"},
  //   {icon: "icon", title: "Cancel order"},
  // ];
  const getServices = () => {
    axios
      .get(baseURL + endPoints.myOrdersPage.getServiceRequest(orderId))
      .then(res => {
        console.log(res, "res in getservuces");
        setServices(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        {!isHelpDrawer && <BackIcon />}
        {title}
      </div>
      <div className={` my-6 flex w-full flex-col mt-4`}>
        {services?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={` ${
                index !== services.length - 1
                  ? " border-b border-EDEDEE"
                  : "border-0"
              } ${styles.request_info_div}`}>
              <div className="flex gap-2 items-center">
                <img
                  className={styles.request_type_icon}
                  src={IconLink + "kyc-pending-warning-active.svg"}
                  alt="icon"
                />
                <p className={styles.request_type}>{item.optionValue}</p>
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

      {/* additional */}
      {isHelpDrawer && (
        <div>
          <p className={styles.additional_content}>Additionally</p>
          <button className={styles.download_btn}>Download invoice</button>
        </div>
      )}
    </div>
  );
}

export default ServiceRequestType;
