import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";
import KycCommonDrawer from "../KycCommonDrawer";
import {
  setKycScreenName,
  setShowQuestionScreen,
  setStageId,
} from "@/store/Slices";

export default function SdkIntegration({item, status, getDashboardDetailsApi}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [selectedId, setSelectedId] = useState(data?.dealCodeNumber);
  const [qustionDrawer, setQustionDrawer] = useState(false);
  const [saveHVData, setSaveHVData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");

  const handler = HyperKycResult => {
    console.log(HyperKycResult, "HyperKycResultHyperKycResultHyperKycResult");
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
      setQustionDrawer(true);
    }
    if (saveHVData?.data?.cibilScore > 650) {
      console.log("show automatically aditional information");
      dispatch(setKycScreenName("professionalDetails"));
      dispatch(setStageId(3));
    }
    if (saveHVData?.data?.cibilScore < 650) {
      dispatch(setKycScreenName("financialInfo"));
      dispatch(setStageId(2));
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
          dispatch(setShowQuestionScreen(false));
          setQustionDrawer(false);
        }
        if (res?.data?.data?.message === "Error while verifying the details") {
          dispatch(setKycScreenName("financialInfo"));
          dispatch(setStageId(2));
        }
      })
      .catch(err => console.log(err));
  };

  const handleIdentityVerification = () => {
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

    // for testing purpose
    //   baseInstance
    //   .post(endPoints.kycPage.saveHyperVergeKycDetails,  {
    //     transactionId: `${userId}_${data?.dealCodeNumber}`,
    //     status: 'auto_approved',
    //     details: {
    //       Face_Match_v_Action: 'pass',
    //       Face_Match_v_Face_Match_Result: 'yes',
    //       'PAN_OCR_ID_Number_-_Front': 'CNIPC4030M',
    //       'PAN_OCR_D.O.B_-_Front': '24-09-2000',
    //       'PoA_OCR_ID_Number_-_Front': 'MP09 20230058553',
    //       'PoA_OCR_Full_Name_-_Front': 'CHETAN',
    //     },
    //     userId,
    //       orderId: data?.dealCodeNumber,
    //   })
    //   .then(res => {
    //     console.log(res?.data?.data, "response of savehyperverdetails");
    //     setSaveHVData(res?.data?.data);
    //     getDashboardDetailsApi();
    //   })
    //   .catch(err => console.log(err));
    // };
  };

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  const drawerContent = () => {
    return (
      <div>
        {console.log(saveHVData?.data?.question, ";;;;;;;;;;;;;;;;;")}
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
        onClick={handleIdentityVerification}>
        <div className={styles.detail_heading}>{item?.stage_name}</div>
        <div className={styles.sub_heading}>{status}</div>
      </div>

      <div
        onClick={handleIdentityVerification}
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
