import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  BackIcon,
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
import {setKycScreenName} from "@/store/Slices";

export default function DashboardComponent() {
  const dispatch = useDispatch();
  const userId = decrypt(getLocalStorage("_ga"));
  const data = useSelector(state => state.kycPage.selectedDataForKyc);

  const fcPaymentData = JSON.parse(data?.fc_paymentData);
  const productImages = (fcPaymentData[0]?.product_image).split(",");
  const productImagesArr =
    productImages.length > 4 ? productImages.slice(0, 3) : productImages;

  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [orderDate, setOrderDate] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [changeProfession, setChangeProfession] = useState(false);

  const getDashboardDetails = () => {
    baseInstance
      .get(endPoints.kycPage.getDashboardDetails(userId, data?.dealCodeNumber))
      .then(res => {
        setDashboardDetails(res?.data?.data);
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
    return format(parsedDate, "d MMM yyyy");
  };

  const convertStatus = number => {
    if (number === 1)
      return <p className={styles.status_style}>Under review</p>;
    else if (number === 2)
      return (
        <p className={styles.status_style}>
          Verified
          <ForwardArrow color={"#222222"} size={16} />
        </p>
      );
    else if (number === 3)
      return (
        <p className={`${styles.status_style} text-D96060`}>
          Rejected
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
            cancel
          </button>
        </div>
      </div>
    );
  };

  const matchKycStatus = {
    "KYC Docs Under Review": "Under review",
    "KYC In Progress": "Pending",
    "KYC Rejected": "Rejected",
    "KYC Completed": "Verified",
    "Delivery Scheduled": "Verified",
  };

  const handleKycStagesClick = item => {
    if (item.id === 4) {
      dispatch(setKycScreenName("personalDetails"));
    }
    if (item.id === 3) {
      dispatch(setKycScreenName("financialInfo"));
    }
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);

  useEffect(() => {
    setOrderDate(dashboardDetails?.orderDate);
  }, [dashboardDetails]);

  return (
    <div>
      <div className={`${styles.heading} justify-between`}>
        <div className="flex items-center gap-2">
          <BackIcon
            color={"#222222"}
            size={20}
            onClick={() => dispatch(setKycScreenName("selectOrderId"))}
            className={"cursor-pointer"}
          />
          Order Id: {data?.dealCodeNumber}
        </div>
        <div className="flex w-fit">
          <div className={`${styles.profession_row} md:flex hidden`}>
            <div className={styles.profession_left}>Profession: Salaried </div>
            <div
              className={styles.profession_right}
              onClick={() => setChangeProfession(true)}>
              Change
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.profession_row} flex md:hidden`}>
        <div className={styles.profession_left}>Profession: Salaried </div>
        <div
          className={styles.profession_right}
          onClick={() => setChangeProfession(true)}>
          Change
        </div>
      </div>

      {changeProfession && (
        <KycCommonDrawer
          content={drawerContent()}
          setChangeProfession={setChangeProfession}
          changeProfession={changeProfession}
        />
      )}

      <div className={styles.order_placed_wrapper}>
        {loadingSkeleton ? (
          <Skeleton variant="rectangular" width={"100%"} height={30} />
        ) : (
          <>
            <div className={styles.order_place_info}>
              <p className={styles.order_place_heading}>Order placed on</p>
              <p className={styles.order_place_date}>{formatDate(orderDate)}</p>
            </div>
            <div className="flex gap-2">
              {Images(productImagesArr)}
              <span>
                {productImages.length > 4 && (
                  <div className="w-[40px] h-[40px] flex justify-center items-center rounded-lg bg-transparent border border-71717A">
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
          {matchKycStatus[dashboardDetails?.zoho_sub_status]}
        </p>
        <p className={styles.sub_heading}>
          We require all your documents to be verified in order to schedule
          delivery.
        </p>
        <button className={styles.schedule_delivery_btn}>
          {matchKycStatus[dashboardDetails?.zoho_sub_status] ===
            "Under review" && "Manage your delivery now"}
          {matchKycStatus[dashboardDetails?.zoho_sub_status] === "Pending" &&
            "Complete KYC to Schedule Delivery"}
          {matchKycStatus[dashboardDetails?.zoho_sub_status] === "Rejected" &&
            "Re-upload your documents now"}
          {matchKycStatus[dashboardDetails?.zoho_sub_status] === "Verified" &&
            "Manage your delivery now"}
          {/* {all  stage status will fill or done then show under review case } */}
          <ForwardArrowWithLine />
        </button>
      </div>

      <div className={styles.details_wrapper}>
        {loadingSkeleton ? (
          <SkeletonData />
        ) : (
          <>
            {dashboardDetails?.allKycStages?.map((item, index) => {
              if (item.id === 1) {
                return (
                  <div key={index.toString()}>
                    <SdkIntegration
                      item={item}
                      status={convertStatus(item?.stage_status)}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    className={styles.details_box}
                    key={index.toString()}
                    onClick={() => handleKycStagesClick(item)}>
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
                  className={`${styles.mobile_detail_box} ${
                    index === 4 ? "border-none" : "border-b"
                  }`}>
                  <div className={styles.detail_heading}>
                    {item?.stage_name}
                  </div>
                  <div className={styles.sub_heading}>
                    pending <ForwardArrow color={"#222222"} size={16} />
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
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
