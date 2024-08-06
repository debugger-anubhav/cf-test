import React, {useEffect, useState} from "react";
import {getLocalStorage} from "@/constants/constant";
import {endPoints} from "@/network/endPoints";
import {baseInstance} from "@/network/axios";
import {decrypt} from "@/hooks/cryptoUtils";
import {useDispatch, useSelector} from "react-redux";
import styles from "../Dashboard/styles.module.css";
import KycCommonDrawer from "../KycCommonDrawer";
import {setKycScreenName, setStageId} from "@/store/Slices";
import DocLoader from "@/components/Documentation/DocLoader/DocLoader";
import {showToastNotification} from "../../Common/Notifications/toastUtils";
import LoaderComponent from "@/components/Common/Loader/LoaderComponent";

export default function SdkIntegration({
  getDashboardDetailsApi,
  openPanSdk,
  setOpenPanSdk,
  setHoldOnLoader,
}) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const professionId = useSelector(state => state.kycPage.selectedProfessionId);

  const userId = decrypt(getLocalStorage("_ga"));
  const [selectedId, setSelectedId] = useState(
    `${userId}_${data?.dealCodeNumber}`,
  );
  const [qustionDrawer, setQustionDrawer] = useState(false);
  const [saveHVData, setSaveHVData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [openLoader, setOpenLoader] = useState(false);
  const [showSimpleLoader, setShowSimpleLoader] = useState(false);

  const handler = HyperKycResult => {
    if (HyperKycResult?.status === "user_cancelled") {
      setOpenPanSdk(false);
    }
    saveHyperVergeDetails({
      ...HyperKycResult,
      userId,
      orderId: data?.dealCodeNumber,
    });
  };

  const saveHyperVergeDetails = details => {
    setHoldOnLoader(true);
    baseInstance
      .post(endPoints.kycPage.saveHyperVergeKycDetails, details)
      .then(res => {
        setSaveHVData(res?.data?.data);
        getDashboardDetailsApi();
        setOpenLoader(false);
        setHoldOnLoader(false);
        if (res?.data?.data?.data?.rejected) {
          showToastNotification(res?.data?.data?.message, 3);
          setOpenPanSdk(false);
        }
        if (res?.data?.data?.data?.status) {
          showToastNotification("Identity verified successfully.", 1);
        }
      })

      .catch(err => {
        setOpenLoader(false);
        setHoldOnLoader(false);
        console.log(err);
      });
  };

  const handleVerfyAns = () => {
    setShowSimpleLoader(true);

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
        if (res?.data?.data?.status === false) {
          setQustionDrawer(false);
          setOpenPanSdk(false);
        }
        if (res?.data?.data?.message === "Error while verifying the details") {
          dispatch(setKycScreenName("financialInfo"));
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
          dispatch(setStageId(2));
          setOpenPanSdk(false);
        }
        setSaveHVData(res?.data?.data);
        setShowSimpleLoader(false);
      })
      .catch(err => {
        console.log(err);

        setShowSimpleLoader(false);
      });
    setSelectedOption("");
  };

  const handleIdentityVerification = () => {
    baseInstance
      .get(endPoints.hyperverge.getHypervergeToken(userId))
      .then(res => {
        const token = res?.data?.data?.result?.token;
        const config = new window.HyperKycConfig(
          token,
          "City_Furnish_Workflow",
          selectedId,
        );
        window.HyperKYCModule.launch(config, handler);
      })
      .catch(err => console.log(err));

    // for testing purpose
    // baseInstance
    //   .post(endPoints.kycPage.saveHyperVergeKycDetails, {
    //     transactionId: `${userId}_${data?.dealCodeNumber}`,
    //     status: "auto_approved",
    //     details: {
    //       Face_Match_v_Action: "pass",
    //       Face_Match_v_Face_Match_Result: "yes",
    //       "PAN_OCR_ID_Number_-_Front": "CNIPC4030M",
    //       "PAN_OCR_D.O.B_-_Front": "24-09-2000",
    //       "PoA_OCR_ID_Number_-_Front": "MP09 20230058553",
    //       "PoA_OCR_Full_Name_-_Front": "CHETAN",
    //     },
    //     userId,
    //     orderId: data?.dealCodeNumber,
    //   })
    //   .then(res => {
    //     console.log(res?.data?.data, "response of savehyperverdetails");
    //     setSaveHVData(res?.data?.data);
    //     getDashboardDetailsApi();
    //   })
    //   .catch(err => console.log(err));
  };

  useEffect(() => {
    if (saveHVData?.type === "questions") {
      setQustionDrawer(true);
    }
    if (saveHVData?.data?.userCancelled) {
      setOpenPanSdk(false);
    }

    if (saveHVData?.data?.cibilScore) {
      if (
        professionId === 4 ||
        professionId === 5 ||
        saveHVData?.data?.cibilScore < 650
      ) {
        dispatch(setKycScreenName("financialInfo"));
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
        dispatch(setStageId(2));
        setOpenPanSdk(false);
      } else {
        if (saveHVData?.data?.cibilScore > 650) {
          dispatch(setKycScreenName("professionalDetails"));
          window.scrollTo({top: 0, left: 0, behavior: "smooth"});
          dispatch(setStageId(3));
          setOpenPanSdk(false);
        }
      }
    }

    // console.log(saveHVData?.type, "llllllllllll");
  }, [saveHVData]);

  useEffect(() => {
    setSelectedId(`${userId}_${data?.dealCodeNumber}`);
  }, [data]);

  useEffect(() => {
    if (openPanSdk) {
      handleIdentityVerification();
    }
  }, []);

  const drawerContent = () => {
    return (
      <div>
        <div className="font-Poppins text-71717A text-base font-medium lg:py-8 py-6 ">
          Question: {saveHVData?.data?.question}
        </div>
        <div className="flex flex-col w-[90%] gap-2">
          {saveHVData?.data?.optionsList?.map((item, index) => {
            return (
              <label
                className="flex gap-3 items-center cursor-pointer"
                key={index.toString()}>
                <input
                  type="radio"
                  className={styles.radio_button}
                  name="radioGroup"
                  onChange={() => setSelectedOption(item)}
                  checked={selectedOption === item}
                />
                <p className="border w-full border-DDDDDF p-4 rounded-xl text-16 font-Poppins tracking-0.3 leading-6">
                  {item}
                </p>
              </label>
            );
          })}
        </div>

        <button
          className={`${styles.cancle_btn} !w-[90%]`}
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
      {qustionDrawer && (
        <KycCommonDrawer
          content={drawerContent()}
          changeState={setQustionDrawer}
          heading={"Questions"}
        />
      )}

      {openLoader && <DocLoader open={openLoader} setOpen={setOpenLoader} />}
      {showSimpleLoader && <LoaderComponent loading={showSimpleLoader} />}
    </>
  );
}
