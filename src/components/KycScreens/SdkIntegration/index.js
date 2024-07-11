import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";
import KycCommonDrawer from "../KycCommonDrawer";
import {setKycScreenName, setShowQuestionScreen} from "@/store/Slices";

export default function SdkIntegration({item, status, getDashboardDetailsApi}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);
  const [qustionDrawer, setQustionDrawer] = useState(false);
  const [saveHVData, setSaveHVData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const showQuestionScreen = useSelector(
    state => state.kycPage.showQuestionScreen,
  );

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
      dispatch(setShowQuestionScreen(true));
    }
    if (saveHVData?.data?.cibilScore > 650) {
      console.log("show automatically aditional information");
      dispatch(setKycScreenName("professionalDetails"));
    }
    if (saveHVData?.data?.cibilScore < 650) {
      dispatch(setKycScreenName("financialInfo"));
    }
    console.log(saveHVData?.data, "saveHVData");
  }, [saveHVData]);

  const handleVerfyAns = () => {
    baseInstance
      .post(endPoints.kycPage.verifyCrifAnswer, {
        orderId: saveHVData?.data?.orderId,
        reportId: saveHVData?.data?.reportId,
        encode: saveHVData?.encode,
        answer: selectedOption,
        placedOrderId: data?.dealCodeNumber,
        userId,
      })
      .then(res => {
        setSaveHVData(res?.data?.data);
        if (res?.data?.data?.status === false) {
          // setQustionDrawer(false);
          dispatch(setShowQuestionScreen(false));
        }
      })
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

  useEffect(() => {
    setQustionDrawer(showQuestionScreen);
  }, [showQuestionScreen]);

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
                  onChange={e => setSelectedOption(e.target.value)}
                  value={item}
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
