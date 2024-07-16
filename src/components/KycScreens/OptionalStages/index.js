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
              className={`${styles.details_box}`}
              key={index.toString()}
              onClick={() => handleClick(item)}>
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
