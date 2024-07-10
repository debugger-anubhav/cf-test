import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";

export default function GstSdk({item, status, getDashboardDetailsApi}) {
  const userId = decrypt(getLocalStorage("_ga"));
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);

  const handler = HyperKycResult => {
    console.log(HyperKycResult, HyperKycResult);
  };

  const handleClick = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = res?.data?.data?.result?.token;
        const config = new window.HyperKycConfig(token, "gstin", selectedId);
        window.HyperKYCModule.launch(config, handler);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  return (
    <>
      <div
        className={`!hidden md:!flex ${styles.details_box}`}
        onClick={handleClick}>
        <div className={styles.detail_heading}>{item?.stage_name}</div>
        <div className={styles.sub_heading}>{status}</div>
      </div>
      <div
        onClick={handleClick}
        className={`${styles.mobile_detail_box} border-b !flex md:!hidden `}>
        <div className={styles.detail_heading}>{item?.stage_name}</div>
        <div className={styles.sub_heading}>{status}</div>
      </div>
    </>
  );
}
