import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";
import {setKycScreenName} from "../../../store/Slices";
import DocLoader from "@/components/Documentation/DocLoader/DocLoader";

export default function GstSdk({
  item,
  status,
  getDashboardDetailsApi,
  openGstSdk,
  setOpenGstSdk,
}) {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);
  const [holdOnLoader, setHoldOnLoader] = useState(false);

  const handler = HyperKycResult => {
    console.log(HyperKycResult, "gst hyperverge");
    setHoldOnLoader(true);
    saveGstDetailsApi({
      ...HyperKycResult,
      userId,
      orderId: data?.dealCodeNumber,
    });
  };

  const handleClick = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = res?.data?.data?.result?.token;
        const config = new window.HyperKycConfig(token, "gstin", selectedId);
        window.HyperKYCModule.launch(config, handler);
        setOpenGstSdk(false);
      })
      .catch(err => console.log(err));
  };

  const saveGstDetailsApi = details => {
    baseInstance
      .post(endPoints.kycPage.saveGstDetails, details)
      .then(res => {
        console.log(res?.data?.data, "response of savehyperverdetails");
        getDashboardDetailsApi();
        dispatch(setKycScreenName("dashboard"));
        setHoldOnLoader(false);
      })
      .catch(err => {
        dispatch(setKycScreenName("dashboard"));
        setHoldOnLoader(false);
        console.log(err);
      });
  };

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  useEffect(() => {
    if (openGstSdk) {
      handleClick();
    }
  }, [openGstSdk]);

  return (
    <>
      {!openGstSdk && (
        <>
          <div
            className={`!hidden md:!flex ${styles.details_box}`}
            onClick={() => {
              if (item.stage_status === 2 || item.stage_status === 1) {
                return null;
              } else handleClick();
            }}>
            <div className={styles.detail_heading}>{item?.stage_name}</div>
            <div className={styles.sub_heading}>{status}</div>
          </div>
          <div
            onClick={() => {
              if (item.stage_status === 2 || item.stage_status === 1) {
                return null;
              } else handleClick();
            }}
            className={`${styles.mobile_detail_box} border-b !flex md:!hidden `}>
            <div className={styles.detail_heading}>{item?.stage_name}</div>
            <div className={styles.sub_heading}>{status}</div>
          </div>
        </>
      )}
      {holdOnLoader && (
        <DocLoader open={holdOnLoader} setOpen={setHoldOnLoader} />
      )}
    </>
  );
}
