import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  BackIcon,
  CheckCircleIcon,
  ForwardArrow,
  ForwardArrowWithLine,
} from "../../../assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import {format, parse} from "date-fns";
import {Skeleton} from "@mui/material";
import KycCommonDrawer from "../KycCommonDrawer";
import SdkIntegration from "../SdkIntegration";
import {
  reduxSetModalState,
  setCurrentAddOpt,
  setKycScreenName,
  setProgressPercent,
  setSelectedProfessionId,
  setStageId,
} from "@/store/Slices";
import GstSdk from "../GstSdk";
import DocLoader from "@/components/Documentation/DocLoader/DocLoader";
import SlotDrawer from "../SlotDrawer/index";
import FinancialQueDrawer from "../FinancialQuestionsDrawer/index";
import OptionalStages from "../OptionalStages/";
import {setPendingDashboardDetail} from "../../../store/Slices";
import CongratulationKyc from "../Congratulation";
// import CongratulationKyc from '../Congratulation/index'

export default function DashboardComponent() {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const modalStateFromRedux = useSelector(state => state.order.isModalOpen);

  const kycSliceData = useSelector(state => state.kycPage);
  const professionId = kycSliceData.selectedProfessionId;
  const pendingDashboardDetail = kycSliceData.pendingDashboardDetail;
  const orderId = data?.dealCodeNumber;

  const fcPaymentData = JSON.parse(data?.fc_paymentData);
  const productImages = fcPaymentData?.map(
    obj => obj?.product_image?.split(",")?.[0],
  );
  const productImagesArr =
    productImages.length > 4 ? productImages.slice(0, 3) : productImages;

  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [orderDate, setOrderDate] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [changeProfession, setChangeProfession] = useState(false);
  const [holdOnLoader, setHoldOnLoader] = useState(false);
  const [openPanSdk, setOpenPanSdk] = useState(false);
  const [openGstSdk, setOpenGstSdk] = useState(false);
  const [openDeliverySlot, setOpenDeliverySlot] = useState(false);
  const [showQueDrawer, setShowQueDrawer] = useState(false);
  const [docsDetailsData, setDocsDetailsData] = useState(null);
  const [activeTab, setactiveTab] = useState("kyc");
  const [currentScreen, setCurrentScreen] = useState(
    kycSliceData.kycScreenName,
  );

  const getDashboardDetailsApi = () => {
    baseInstance
      .get(endPoints.kycPage.getDashboardDetails(userId, data?.dealCodeNumber))
      .then(res => {
        setDashboardDetails(res?.data?.data);
        dispatch(
          setSelectedProfessionId(
            res?.data?.data?.professionDetail?.profession_id,
          ),
        );
        setOrderDate(res?.data?.data?.orderDate);
        setLoadingSkeleton(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setLoadingSkeleton(false);
      });
  };

  const formatDate = dateString => {
    const parsedDate = parse(
      dateString || "2024-05-03 21:09:17",
      "yyyy-MM-dd HH:mm:ss",
      new Date(),
    );
    return format(parsedDate, "d MMM, yyyy");
  };

  const convertStatus = number => {
    if (number === 1)
      return <p className={`${styles.status_style}`}>Under review</p>;
    else if (number === 2)
      return (
        <p className={`${styles.status_style} text-[#2D9469]`}>
          Verified
          <CheckCircleIcon color={"#2D9469"} size={16} />
        </p>
      );
    else if (number === 3)
      return (
        <p className={`${styles.status_style} text-D96060`}>
          Attention needed
          <ForwardArrow color={"#D96060"} size={16} />
        </p>
      );
    else
      return (
        <p className={styles.status_style}>
          pending
          <ForwardArrow color={"#222222"} size={16} />
        </p>
      );
  };

  const drawerContent = () => {
    return (
      <div>
        <p className={styles.content_text}>
          You’ll need to submit new professional details specific to the chosen
          profession. Are you sure you want to proceed?
        </p>
        <div className={styles.btn_wrapper}>
          <button
            className={`${styles.plain_btn} !mt-0 justify-center !w-full lg:w-full`}
            onClick={() => dispatch(setKycScreenName("workProfession"))}>
            Yes, I want to change my profession
          </button>
          <button
            className={`${styles.cancle_btn} `}
            onClick={() => setChangeProfession(false)}>
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const matchKycStatus = {
    "KYC Docs Under Review": "Under review",
    "KYC In Progress": "Pending",
    "KYC Rejected": "Attention needed",
    "KYC Completed": "Verified",
    "Delivery Scheduled": "Verified",
  };

  const getDocsDetailsApi = stageId => {
    baseInstance
      .post(endPoints.kycPage.getDocsDetails, {
        orderId,
        userId,
        professionId,
        stageId,
      })
      .then(res => {
        if (
          res?.data?.data?.crifQuestionData?.isQuestion === false &&
          stageId === 2
        ) {
          dispatch(setKycScreenName("financialInfo"));
        }
        if (stageId === 7) {
          dispatch(setKycScreenName("educationalDetails"));
        }
        if (stageId === 5) {
          dispatch(setKycScreenName("currentAddress"));
        }
        setShowQueDrawer(res?.data?.data?.crifQuestionData?.isQuestion);
        setHoldOnLoader(false);
        setDocsDetailsData(res?.data?.data?.crifQuestionData?.questionData);
        dispatch(setCurrentAddOpt(res?.data?.data?.requiredDocs));
      })
      .catch(err => {
        console.log(err);
        setHoldOnLoader(false);
      });
  };

  const handleKycStagesClick = item => {
    window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    dispatch(setStageId(item.id));

    if (item.id === 1) {
      setOpenPanSdk(true);
    }
    if (item.id === 2) {
      if (matchKycStatus[dashboardDetails?.zoho_sub_status] === "Pending") {
        setHoldOnLoader(true);
        getDocsDetailsApi(2);
      }
    }
    if (item.id === 3) {
      if (matchKycStatus[dashboardDetails?.zoho_sub_status] === "Pending") {
        dispatch(setKycScreenName("professionalDetails"));
      }
    }
    if (item.id === 6) {
      dispatch(setKycScreenName("autoPay"));
    }
    if (item.id === 7) {
      setHoldOnLoader(true);
      getDocsDetailsApi(7);
    }
  };

  const handleDelivery = () => {
    if (pendingDashboardDetail?.length > 0) {
      handleKycStagesClick(pendingDashboardDetail[0]);
      if (pendingDashboardDetail[0]?.id === 3 && professionId === 2) {
        setOpenGstSdk(true);
      } else if (pendingDashboardDetail[0]?.id === 1) {
        setOpenPanSdk(true);
      }
    } else toggleModal();
  };

  const toggleModal = () => {
    setOpenDeliverySlot(!openDeliverySlot);
    dispatch(reduxSetModalState(!modalStateFromRedux));
  };

  useEffect(() => {
    getDashboardDetailsApi();
  }, []);

  useEffect(() => {
    setOrderDate(dashboardDetails?.orderDate);
  }, [dashboardDetails]);

  useEffect(() => {
    const pendingStage = dashboardDetails?.allKycStages?.filter(
      i => i.stage_status === 0 || i.stage_status === 3,
    );
    dispatch(setPendingDashboardDetail(pendingStage));
  }, [dashboardDetails]);

  useEffect(() => {
    const totalProgress = dashboardDetails?.allKycStages?.length;
    const progress = dashboardDetails?.allKycStages?.filter(
      i => i.stage_status === 2 || i.stage_status === 1,
    );

    const progressPercentage =
      totalProgress > 0
        ? Math.round((progress?.length / totalProgress) * 100)
        : 0;
    dispatch(setProgressPercent(progressPercentage));
  }, [dashboardDetails]);

  useEffect(() => {
    setCurrentScreen(kycSliceData.kycScreenName);
  }, [kycSliceData.kycScreenName]);

  return (
    <div>
      {currentScreen === "congratulation" ? (
        <CongratulationKyc
          dashboardDetails={dashboardDetails}
          handleDelivery={handleDelivery}
        />
      ) : (
        <div>
          <div className={`${styles.heading} justify-between`}>
            <div className="flex items-center gap-2">
              <BackIcon
                color={"#222222"}
                size={20}
                onClick={() => dispatch(setKycScreenName("selectOrderId"))}
                className={"cursor-pointer"}
              />
              Order ID: #{data?.dealCodeNumber}
            </div>
            <div className="flex w-fit">
              <div className={`${styles.profession_row} md:flex hidden`}>
                <div className={styles.profession_left}>
                  Profession: {dashboardDetails?.professionDetail?.profession}{" "}
                </div>
                <div
                  className={styles.profession_right}
                  onClick={() => setChangeProfession(true)}>
                  Change
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.profession_row} flex md:hidden`}>
            <div className={styles.profession_left}>
              Profession: {dashboardDetails?.professionDetail?.profession}{" "}
            </div>
            <div
              className={styles.profession_right}
              onClick={() => setChangeProfession(true)}>
              Change
            </div>
          </div>

          <div className={styles.order_placed_wrapper}>
            {loadingSkeleton ? (
              <Skeleton variant="rectangular" width={"100%"} height={30} />
            ) : (
              <>
                <div className={styles.order_place_info}>
                  <p className={styles.order_place_heading}>Order placed on</p>
                  <p className={styles.order_place_date}>
                    {formatDate(orderDate)}
                  </p>
                </div>
                <div className="flex gap-2">
                  {Images(productImagesArr)}
                  <span>
                    {productImages.length > 4 && (
                      <div className="w-[40px] h-[40px] flex justify-center items-center rounded-[4px] bg-transparent border border-71717A text-71717A font-medium text-14">
                        +{productImages?.length - 3}
                      </div>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>

          <div className={styles.kyc_status_box}>
            <p className={styles.sub_heading}>KYC status:</p>
            <p className={`${styles.heading}  md:!text-20 `}>
              {dashboardDetails?.kycStatus}
              {dashboardDetails?.kycStatus === "Under Review" && (
                <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/exclamatory-icn.svg" />
              )}
              {dashboardDetails?.kycStatus === "Verified" && (
                <CheckCircleIcon color={"#2D9469"} size={18} />
              )}
              {dashboardDetails?.kycStatus === "Pending"}
              {dashboardDetails?.kycStatus === "Rejected" && (
                <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/red-exclamatory-icn.svg" />
              )}
            </p>
            <p className={styles.sub_heading}>{dashboardDetails?.kycMessage}</p>

            <button
              className={`${styles.schedule_delivery_btn}
        ${
          dashboardDetails?.kycStatus === "Under Review"
            ? "bg-FFDF85 cursor-not-allowed"
            : "bg-btn-primary cursor-pointer"
        }
        `}
              disabled={dashboardDetails?.kycStatus === "Under Review"}
              onClick={() => handleDelivery()}>
              {dashboardDetails?.kycStatus === "Under Review" && (
                <div className="flex items-center gap-1">
                  <img
                    src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/lock-icn.svg"
                    alt="lock"
                    width={20}
                    height={20}
                  />
                  <p>Manage your delivery now</p>
                </div>
              )}

              {dashboardDetails?.kycStatus === "Verified" && (
                <div className="flex items-center gap-1">
                  <img
                    src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/exclamatory-icn.svg"
                    alt="lock"
                    width={20}
                    height={20}
                  />
                  <p>Manage your delivery now</p>
                </div>
              )}

              {dashboardDetails?.kycStatus === "Pending" &&
                "Complete KYC to Schedule Delivery"}

              {dashboardDetails?.kycStatus === "Rejected" &&
                "Re-upload your documents now"}

              {dashboardDetails?.kycStatus !== "Under Review" && (
                <ForwardArrowWithLine />
              )}
            </button>
          </div>

          {dashboardDetails?.isOptionalStages && (
            <div className={styles.kyc_tab}>
              <p
                className={
                  activeTab === "kyc" ? styles.active_tab_item : styles.tab_item
                }
                onClick={() => setactiveTab("kyc")}>
                KYC
              </p>
              <p
                className={
                  activeTab === "optional"
                    ? styles.active_tab_item
                    : styles.tab_item
                }
                onClick={() => setactiveTab("optional")}>
                Optional KYC
              </p>
            </div>
          )}

          {activeTab === "kyc" && (
            <>
              <div className={styles.details_wrapper}>
                {loadingSkeleton ? (
                  <SkeletonData />
                ) : (
                  <>
                    {dashboardDetails?.allKycStages?.map((item, index) => {
                      if (item.id === 3 && professionId === 2) {
                        return (
                          <div key={index.toString()}>
                            <GstSdk
                              item={item}
                              status={convertStatus(item?.stage_status)}
                              getDashboardDetailsApi={getDashboardDetailsApi}
                            />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            className={`${styles.details_box} ${
                              item.stage_status === 2 || item.stage_status === 1
                                ? "!cursor-default"
                                : "cursor-pointer"
                            }`}
                            key={index.toString()}
                            onClick={() => {
                              if (
                                dashboardDetails?.allKycStages?.[0]
                                  ?.stage_status !== 2
                              ) {
                                setOpenPanSdk(true);
                              } else if (item.stage_status !== 2) {
                                handleKycStagesClick(item);
                              }
                            }}>
                            <div className={styles.detail_heading}>
                              {item?.stage_name}
                            </div>
                            <div className={styles.sub_heading}>
                              {convertStatus(item?.stage_status)}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>

              <div className={styles.mobile_details_wrapper}>
                {loadingSkeleton ? (
                  <SkeletonData />
                ) : (
                  <>
                    {dashboardDetails?.allKycStages?.map((item, index) => {
                      return (
                        <div
                          key={index.toString()}
                          onClick={() => {
                            if (
                              dashboardDetails?.allKycStages?.[0]
                                ?.stage_status !== 2
                            ) {
                              setOpenPanSdk(true);
                            } else if (item.stage_status !== 2) {
                              handleKycStagesClick(item);
                            }
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
                          <div className={styles.detail_heading}>
                            {item?.stage_name}
                          </div>
                          <div className={styles.sub_heading}>
                            {convertStatus(item?.stage_status)}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}

          {activeTab === "optional" && (
            <OptionalStages
              convertStatus={convertStatus}
              getDocsDetailsApi={getDocsDetailsApi}
              setHoldOnLoader={setHoldOnLoader}
              setactiveTab={setactiveTab}
            />
          )}

          {holdOnLoader && (
            <DocLoader open={holdOnLoader} setOpen={setHoldOnLoader} />
          )}

          {openPanSdk && (
            <SdkIntegration
              openPanSdk={openPanSdk}
              setOpenPanSdk={setOpenPanSdk}
              getDashboardDetailsApi={getDashboardDetailsApi}
            />
          )}

          {professionId === 2 && openGstSdk && (
            <GstSdk openGstSdk={openGstSdk} setOpenGstSdk={setOpenGstSdk} />
          )}

          {openDeliverySlot && (
            <SlotDrawer
              isModalOpen={openDeliverySlot}
              closeModal={toggleModal}
              orderId={orderId}
              width={230}
              getDashboardDetails={getDashboardDetailsApi}
            />
          )}

          {changeProfession && (
            <KycCommonDrawer
              content={drawerContent()}
              changeState={setChangeProfession}
              heading={"Change Profession?"}
            />
          )}

          {showQueDrawer && (
            <FinancialQueDrawer
              changeState={setShowQueDrawer}
              docsDetailsData={docsDetailsData}
            />
          )}
        </div>
      )}
    </div>
  );
}

const Images = arr => {
  return (
    <div className="flex w-full gap-2">
      {arr?.map((ele, i) => {
        return (
          <div key={i.toString()} className="flex w-full flex-col">
            {" "}
            <img
              src={`${productPageImagesBaseUrl + "thumb/" + ele}`}
              alt={ele}
              className="w-[40px] h-[40px] rounded-lg"
              loading="lazy"
            />
          </div>
        );
      })}
    </div>
  );
};

const SkeletonData = () => {
  return (
    <>
      {[1, 2, 3, 4, 5].map(item => {
        return (
          <div key={item.toString()}>
            <Skeleton
              variant="rectangular"
              className={`${styles.details_box} !hidden md:!flex `}
              height={111}
            />
            <Skeleton
              variant="rectangular"
              className={`${styles.mobile_detail_box} flex md:!hidden my-4`}
            />
          </div>
        );
      })}
    </>
  );
};
