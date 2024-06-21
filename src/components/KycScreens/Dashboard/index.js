import React from "react";
import styles from "./styles.module.css";
import {
  BackIcon,
  ForwardArrow,
  ForwardArrowWithLine,
} from "../../../assets/icon";

export default function Dashboard({setOpenDashboard}) {
  return (
    <div>
      <div className={styles.heading}>
        <BackIcon
          color={"#222222"}
          size={20}
          onClick={() => setOpenDashboard(false)}
          className={"cursor-pointer"}
        />
        Order Id:
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
    </div>
  );
}
