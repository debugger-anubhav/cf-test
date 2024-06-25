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
import {getLocalStorage} from "@/constants/constant";
import {format, parse} from "date-fns";

export default function Dashboard({setOpenDashboard}) {
  const data = useSelector(state => state.kycPage.selectedDataForKyc);
  const userId = decrypt(getLocalStorage("_ga"));
  const [dashboardDetails, setDashboardDetails] = useState([]);
  const [orderData, setOrderData] = useState(null);

  const getDashboardDetails = () => {
    baseInstance
      .get(endPoints.kycPage.getDashboardDetails(userId, data?.dealCodeNumber))
      .then(res => {
        setDashboardDetails(res?.data?.data);
        setOrderData(res?.data?.data?.orderDate);
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

  useEffect(() => {
    getDashboardDetails();
  }, []);

  useEffect(() => {
    setOrderData(dashboardDetails?.orderDate);
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
          <p className={styles.order_place_date}>{formatDate(orderData)}</p>
        </div>
        <div>images</div>
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
        {[1, 2, 3, 4, 5]?.map((item, index) => {
          return (
            <div className={styles.details_box} key={index.toString()}>
              <div className={styles.detail_heading}>PAN Details</div>
              <div className={styles.sub_heading}>
                pending <ForwardArrow color={"#222222"} size={16} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.mobile_details_wrapper}>
        {[1, 2, 3, 4, 5]?.map((item, index) => {
          return (
            <div
              key={index.toString()}
              className={`${styles.mobile_detail_box} ${
                index === 4 ? "border-none" : "border-b"
              }`}>
              <div className={styles.detail_heading}>PAN details</div>
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
