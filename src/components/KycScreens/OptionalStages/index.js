import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import styles from "./styles.module.css";
import {setKycScreenName} from "@/store/Slices";
// import CurrentAddProof from '../CurrentAddProf/index'

export default function OptionalStages({
  convertStatus,
  getDocsDetailsApi,
  setHoldOnLoader,
  setactiveTab,
}) {
  const dispatch = useDispatch();
  const [optionalData, setOptionalData] = useState(null);
  const userId = decrypt(getLocalStorage("_ga"));

  const kycSliceData = useSelector(state => state.kycPage);
  const orderId = kycSliceData?.selectedDataForKyc?.dealCodeNumber;

  const getOptionalStages = () => {
    baseInstance
      .get(endPoints.kycPage.getOptionalStages(userId, orderId))
      .then(res => {
        setOptionalData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getOptionalStages();
  }, []);

  const handleClick = item => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    if (item.id === 4) {
      dispatch(setKycScreenName("socialMedia"));
    }
    if (item.id === 5) {
      setHoldOnLoader(true);
      getDocsDetailsApi(5);
    }
  };

  return (
    <>
      <div className={styles.details_wrapper}>
        {optionalData?.allKycStages?.map((item, index) => {
          return (
            <div
              className={`${styles.details_box} ${
                item.stage_status === 2 || item.stage_status === 1
                  ? "!cursor-default"
                  : "cursor-pointer"
              }`}
              key={index.toString()}
              onClick={() => {
                if (item.stage_status === 2 || item.stage_status === 1) {
                  return null;
                } else handleClick(item);
              }}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading}>
                {convertStatus(item?.stage_status)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mobile_details_wrapper}>
        {optionalData?.allKycStages?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              onClick={() => {
                if (item.stage_status === 2 || item.stage_status === 1) {
                  return null;
                } else handleClick(item);
              }}
              className={`${styles.mobile_detail_box} ${
                index === 4 ? "border-none" : "border-b"
              }
                    ${
                      item.stage_status === 2 || item.stage_status === 1
                        ? "!cursor-default"
                        : "cursor-pointer"
                    }
                    
                    `}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading}>
                {convertStatus(item?.stage_status)}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
