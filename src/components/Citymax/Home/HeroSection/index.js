import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import CommonCard from "../../Common/CommonCard";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

const HeroSection = () => {
  const [isHalfYearly, setHalfYearly] = useState(true);
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
      <h1 className={styles.header}>
        Rent <span className={styles.max}>MAX</span>, pay less.
      </h1>
      <p className={styles.tag_line}>
        Simple plans for complete home furnishing
      </p>

      <div className={styles.center}>
        <div className={styles.monthly_toggler}>
          <p
            onClick={() => {
              setHalfYearly(true);
            }}
            className={`${
              isHalfYearly
                ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                : "bg-transparent"
            } ${styles.pref_mode_text}`}>
            6 months
          </p>
          <p
            onClick={() => {
              setHalfYearly(false);
            }}
            className={`${
              isHalfYearly
                ? "bg-transparent"
                : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
            } ${styles.pref_mode_text}`}>
            12 months
          </p>
        </div>
      </div>

      <div className={`${styles.center} ${styles.card_wrapper}`}>
        {plans?.citymax_plans
          ?.filter(item =>
            isHalfYearly
              ? item.attr_name === "6 Months"
              : item.attr_name === "12 Months",
          )
          .map((item, index) => (
            <div key={index.toString()} className="md:w-[328px]">
              <CommonCard
                isHalfYearly={isHalfYearly}
                item={item}
                plans={plans}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default HeroSection;
