import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {
  BackIcon,
  ForwardArrow,
  ForwardArrowWithLine,
} from "../../../assets/icon";
import {useSelector} from "react-redux";
import {decrypt} from "@/hooks/cryptoUtils";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import {format, parse} from "date-fns";

export default function Dashboard({setOpenDashboard}) {
  const userId = decrypt(getLocalStorage("_ga"));
  const data = useSelector(state => state.kycPage.selectedDataForKyc);

  const fcPaymentData = JSON.parse(data?.fc_paymentData);
  const productImages = (fcPaymentData[0]?.product_image).split(",");
  const productImagesArr =
    productImages.length > 4 ? productImages.slice(0, 3) : productImages;

  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [orderDate, setOrderDate] = useState(null);

  const getDashboardDetails = () => {
    baseInstance
      .get(endPoints.kycPage.getDashboardDetails(userId, data?.dealCodeNumber))
      .then(res => {
        setDashboardDetails(res?.data?.data);
        setOrderDate(res?.data?.data?.orderDate);
      })
      .catch(err => {
        console.log(err?.message || "some error");
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

  useEffect(() => {
    getDashboardDetails();
  }, []);

  useEffect(() => {
    setOrderDate(dashboardDetails?.orderDate);
  }, [dashboardDetails]);

  return (
    <div>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => setOpenDashboard(false)}
          className={"cursor-pointer"}
        />
        Order Id: {data?.dealCodeNumber}
      </div>

      <div className={styles.order_placed_wrapper}>
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
      </div>

      <div className={styles.kyc_status_box}>
        <p className={styles.sub_heading}>KYC status:</p>
        <p className={`${styles.heading}  md:!text-20 `}>Pending</p>
        <p className={styles.sub_heading}>
          We require all your documents to be verified in order to schedule
          delivery.
        </p>
        <button className={styles.schedule_delivery_btn}>
          Complete KYC to Schedule Delivery <ForwardArrowWithLine />
        </button>
      </div>

      <div className={styles.details_wrapper}>
        {dashboardDetails?.allKycStages?.map((item, index) => {
          return (
            <div className={styles.details_box} key={index.toString()}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading}>
                {convertStatus(item?.stage_status)}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mobile_details_wrapper}>
        {dashboardDetails?.allKycStages?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={`${styles.mobile_detail_box} ${
                index === 4 ? "border-none" : "border-b"
              }`}>
              <div className={styles.detail_heading}>{item?.stage_name}</div>
              <div className={styles.sub_heading}>
                pending <ForwardArrow color={"#222222"} size={16} />
              </div>
            </div>
          );
        })}
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
