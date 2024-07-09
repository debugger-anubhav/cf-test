import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";
import KycCommonDrawer from "../KycCommonDrawer";

export default function SdkIntegration({item, status, getDashboardDetailsApi}) {
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);
  const [qustionDrawer, setQustionDrawer] = useState(false);
  const [saveHVData, setSaveHVData] = useState(null);
  // const hyperKycConfig = new window.HyperKycConfig(
  //    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6InNtbGNpNiIsImhhc2giOiIwYTk3OGM3ZjE5OWRhYzJiYzgzMDk5NzY3OTY0Y2Y1MzA1OTc5NmFlYTRiYjI3NjI3Yzg2M2U4ZjQyNzhkYzM0IiwiaWF0IjoxNzE5NTU3MzUzLCJleHAiOjE3MTk2MDA1NTMsImp0aSI6IjRiNDhkNmViLTY2YjQtNDdhMy1iYmZhLWNiZTlmNTdkNWFhNiJ9.ZKTgMXjM1ayb3Rqea6MvotH0zf6nV-U6Ju8ItYR0OT1Bq61cg433GYefinxceg_YzTFXCa7rNpegJ0Tp5gyklAM78L3-SMkxxiuCtjEdfdun0vaTwexsKQBTUcOGxLMCld6Sua-WYVtkUgY00Wm2G0EYlaS0OkxrpBTpF6WucaU ",
  //   "workflow_uZRJMIc",
  //   90035_902767639,
  // );

  const handler = HyperKycResult => {
    saveHyperVergeDetails({
      ...HyperKycResult,
      userId,
      orderId: data?.dealCodeNumber,
    });
  };

  const saveHyperVergeDetails = details => {
    baseInstance
      .post(endPoints.kycPage.saveHyperVergeKycDetails, details)
      .then(res => {
        console.log(res?.data?.data, "response of savehyperverdetails");
        setSaveHVData(res?.data?.data);
        getDashboardDetailsApi();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    if (saveHVData?.type === "questions") {
      setQustionDrawer(true);
    }
    // console.log(saveHVData,"saveHVData")
  }, [saveHVData]);

  const handleVerfyAns = () => {
    baseInstance
      .post(endPoints.kycPage.verifyCrifAnswer, {
        orderId: saveHVData?.data?.orderId,
        reportId: saveHVData?.data?.reportId,
        encode: saveHVData?.encode,
        answer: "ELECTRONICA FINANCE LIMITED",
        placedOrderId: data?.dealCodeNumber,
      })
      .then(res => console.log(res, "eeeeeeeeeee"))
      .catch(err => console.log(err));
    // setQustionDrawer(false);
  };

  const handleClick = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = res?.data?.data?.result?.token;
        const config = new window.HyperKycConfig(
          token,
          "City-Furnish-Workflow",
          selectedId,
        );
        window.HyperKYCModule.launch(config, handler);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  const drawerContent = () => {
    return (
      <div>
        <div className="font-Poppins text-71717A text-base font-medium lg:py-8 py-6 ">
          Question: {saveHVData?.data?.question}
        </div>
        <div className="flex flex-col w-[90%] gap-2">
          {saveHVData?.data?.optionsList?.map((item, index) => {
            return (
              <div
                className="flex gap-3 items-center cursor-pointer"
                key={index.toString()}>
                <input
                  type="radio"
                  className={styles.radio_button}
                  name="radioGroup"
                />
                <p className="border w-full border-DDDDDF p-4 rounded-xl text-16 font-Poppins tracking-0.3 leading-6">
                  {item}
                </p>
              </div>
            );
          })}
        </div>

        <button
          className={`${styles.cancle_btn} !w-[80%]`}
          onClick={() => {
            handleVerfyAns();
          }}>
          Proceed
        </button>
      </div>
    );
  };
  return (
    <>
      <div className={styles.details_box} onClick={handleClick}>
        <div className={styles.detail_heading}>{item?.stage_name}</div>
        <div className={styles.sub_heading}>{status}</div>
      </div>

      {qustionDrawer && (
        <KycCommonDrawer
          content={drawerContent()}
          setChangeProfession={setQustionDrawer}
          changeProfession={qustionDrawer}
          heading={"Questions"}
        />
      )}
    </>
  );
}
