import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow, IconLink} from "@/assets/icon";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import CancelOrder from "./CancelOrder";
import SwapProduct from "./SwapProduct";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import Buy from "./Buy";

function ServiceRequestType({
  orderId,
  isHelpDrawer,
  title,
  setShowNextComponent,
}) {
  const userId = decrypt(getLocalStorage("_ga"));
  const [servicesType, setServicesType] = useState();
  const [selectedType, setSelectedType] = useState(null);
  const [currentScreen, setCurrentScreen] = useState(true);
  const [productDetail, setProductDetail] = useState(null);

  const getServicesType = () => {
    axios
      .get(baseURL + endPoints.myOrdersPage.getServiceRequest(orderId))
      .then(res => {
        setServicesType(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  const getProductLists = () => {
    axios
      .get(
        baseURL + endPoints.serviceRequestPage.getProductLists(orderId, userId),
      )
      .then(res => {
        setProductDetail(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getServicesType();
    getProductLists();
  }, []);

  return (
    <>
      {currentScreen ? (
        <div className={styles.content_wrapper}>
          <div className={styles.main_heading}>
            {!isHelpDrawer && (
              <BackIcon
                className={"cursor-pointer"}
                onClick={() => setShowNextComponent(false)}
              />
            )}
            {title}
          </div>
          <div className={` my-6 flex w-full flex-col mt-4`}>
            {servicesType?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={` ${
                    index !== servicesType.length - 1
                      ? " border-b border-EDEDEE"
                      : "border-0"
                  } ${styles.request_info_div}`}
                  onClick={() => {
                    setSelectedType(item.optionValue);
                    setCurrentScreen(false);
                  }}>
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
      ) : (
        <>
          {selectedType === "Cancel Order" && (
            <CancelOrder prevScreen={setCurrentScreen} />
          )}
          {selectedType === "Upgrade" && (
            <SwapProduct prevScreen={setCurrentScreen} data={productDetail} />
          )}
          {selectedType === "Buy" && (
            <Buy
              prevScreen={setCurrentScreen}
              data={productDetail}
              heading="Buy"
            />
          )}
        </>
      )}
    </>
  );
}

export default ServiceRequestType;
