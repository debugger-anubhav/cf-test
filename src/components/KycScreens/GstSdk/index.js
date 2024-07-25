import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import {setKycScreenName} from "../../../store/Slices";
import DocLoader from "@/components/Documentation/DocLoader/DocLoader";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

export default function GstSdk({
  getDashboardDetailsApi,
  openGstSdk,
  setOpenGstSdk,
}) {
  const dispatch = useDispatch();
  const kycSliceData = useSelector(state => state.kycPage);
  const userId = decrypt(getLocalStorage("_ga"));
  const data = kycSliceData.selectedDataForKyc;
  const [selectedId, setSelectedId] = useState(
    `${userId}_${data?.dealCodeNumber}`,
  );
  const [holdOnLoader, setHoldOnLoader] = useState(false);
  const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;

  const handler = HyperKycResult => {
    if (HyperKycResult?.status === "user_cancelled") {
      setOpenGstSdk(false);
    }
    // console.log(HyperKycResult, "gst hyperverge");
    setHoldOnLoader(true);
    saveGstDetailsApi({
      ...HyperKycResult,
      userId,
      orderId: data?.dealCodeNumber,
    });
    setHoldOnLoader(false);
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
        if (res?.data?.data?.data?.rejected) {
          showToastNotification(res?.data?.data?.message, 3);
        } else {
          getDashboardDetailsApi();
          setTimeout(() => {
            const pendingStage = pendingDashboardDetail?.filter(
              i => i.stage_status === 0 || i.stage_status === 1,
            );
            console.log(pendingStage, "pendingStage");
            if (pendingStage.length > 0) {
              const ID = pendingStage?.[0]?.id;
              if (ID === 2) {
                dispatch(setKycScreenName("financialInfo"));
              }
              if (ID === 7) {
                dispatch(setKycScreenName("educationalDetails"));
              }
              if (ID === 6) {
                dispatch(setKycScreenName("autoPay"));
              }
            } else {
              dispatch(setKycScreenName("congratulation"));
            }
          }, 1500);
        }
      })

      .catch(err => {
        dispatch(setKycScreenName("dashboard"));
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
      {/* {!openGstSdk && (
        <>
          <div
            className={`!hidden md:!flex ${styles.details_box}`}
            onClick={() => {
              if (item.stage_status === 2 || item.stage_status === 1) {
                return null;
              } else handleClick();
            }}>
            <div className={styles.first_row_detail_box}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading_box}>{status}</div>
            </div>
            <div className={styles.second_row_detail_box}>
              {item?.stage_description}
            </div>
            {item?.rejected_reason && (
              <div className={styles.rejected_reason}>
                <InfoCircleIcon
                  color={"#45454A"}
                  size={15}
                  className={"pr-2"}
                />
                {item?.rejected_reason}
              </div>
            )}
          </div>

          <div
            onClick={() => {
              if (item.stage_status === 2 || item.stage_status === 1) {
                return null;
              } else handleClick();
            }}
            className={`${styles.mobile_detail_box} border-b !flex md:!hidden `}>
            <div className={styles.first_row_detail_box}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading_box}>{status}</div>
            </div>
            <div className={styles.second_row_detail_box}>
              {item?.stage_description}
            </div>
            {item?.rejected_reason && (
              <div className={styles.rejected_reason}>
                <InfoCircleIcon color={"#45454A"} size={15} />
                {item?.rejected_reason}
              </div>
            )}
          </div>
        </>
      )} */}
      {holdOnLoader && (
        <DocLoader open={holdOnLoader} setOpen={setHoldOnLoader} />
      )}
    </>
  );
}
