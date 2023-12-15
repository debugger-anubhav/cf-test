import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import CommonCard from "../../Common/CommonCard";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";

const ChangePlanDrawer = ({isHalfYearly}) => {
  const [plans, setPlans] = useState();
  const fetchPlans = () => {
    axios
      .get(baseURL + endPoints.cityMaxPage.getAllPlans)
      .then(res => {
        setPlans(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    fetchPlans();
  }, []);
  return (
    <div className={styles.main}>
      <p className={styles.header}>Select plan</p>
      <div className={styles.map_wrapper}>
        {plans?.citymax_plans
          ?.filter(item =>
            isHalfYearly
              ? item.attr_name === "6 Months"
              : item.attr_name === "12 Months",
          )
          .map((item, index) => (
            <div key={index.toString()} className="md:w-[393px]">
              <CommonCard
                item={item}
                isHalfYearly={isHalfYearly}
                plans={plans}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChangePlanDrawer;
