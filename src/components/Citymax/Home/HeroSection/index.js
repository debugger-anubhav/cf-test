import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import CommonCard from "../../Common/CommonCard";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {setIsHalfYearlyState} from "@/store/Slices";
import {baseInstance} from "@/network/axios";

const HeroSection = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state?.citymax?.isHalfYearly);
  const [isHalfYearly, setHalfYearly] = useState(state);
  const [plans, setPlans] = useState();

  const fetchPlans = () => {
    baseInstance
      .get(endPoints.cityMaxPage.getAllPlans)
      .then(res => {
        setPlans(res?.data?.data);
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.header}>
        Rent <span className={styles.max}>MAX</span>, pay less.
      </h1>
      <h2 className={styles.tag_line}>
        Simple plans for complete home furnishing
      </h2>

      <div className={styles.center}>
        <div className={styles.monthly_toggler}>
          <p
            onClick={() => {
              setHalfYearly(true);
              dispatch(setIsHalfYearlyState(true));
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
              dispatch(setIsHalfYearlyState(false));
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
            <div key={index} className="w-full md:w-[328px]">
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
