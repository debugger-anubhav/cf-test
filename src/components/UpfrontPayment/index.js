import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {ForwardArrowWithLine} from "@/assets/icon";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {useParams} from "next/navigation";
import {Skeleton} from "@mui/material";

function UpfrontPayment() {
  const Heading = "Upfront Payment";
  const params = useParams();
  const ID = params.key;
  const [apiData, setApiData] = useState(null);
  const upfrontApiCall = () => {
    axios
      .post(baseURL + endPoints.upfrontPayment, {id: ID})
      .then(res => {
        // console.log(res?.data?.data?.data, "ressss");
        setApiData(res?.data?.data?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    upfrontApiCall();
  }, []);
  return (
    <div className={styles.wrapper}>
      <p className={styles.main_heading}>{Heading}</p>
      <div className={styles.upfront_data}>
        <p className={styles.heading}>
          Your Order ID
          {apiData ? (
            <span className={styles.heading_span}>: #{apiData?.order_id}</span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
        <p className={styles.heading}>
          Tenure
          {apiData ? (
            <span className={styles.heading_span}>: {apiData?.tenure}</span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
        <p className={styles.heading}>
          Upfront amount
          {apiData ? (
            <span className={styles.heading_span}>
              {" "}
              : <span className="font-Inter">₹</span>
              {apiData?.amount}
            </span>
          ) : (
            <Skeleton variant="text" width={100} className="ml-3" />
          )}
        </p>
      </div>
      <div>
        <button className={styles.pay_now_btn}>
          Pay now
          <ForwardArrowWithLine size={20} color={"#222222"} />
        </button>
      </div>
    </div>
  );
}

export default UpfrontPayment;
