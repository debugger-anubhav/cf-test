import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage} from "@/constants/constant";
import styles from "./styles.module.css";
// import CurrentAddProof from '../CurrentAddProf/index'

export default function OptionalStages({convertStatus}) {
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

  return (
    <>
      <div className={styles.details_wrapper}>
        {optionalData?.allKycStages?.map((item, index) => {
          return (
            <div className={`${styles.details_box}`} key={index.toString()}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading}>
                {convertStatus(item?.stage_status)}
              </div>
            </div>
          );
        })}
      </div>

      {/* <CurrentAddProof/> */}
    </>
  );
}
