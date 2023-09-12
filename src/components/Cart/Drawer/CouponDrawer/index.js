import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";

const CouponDrawer = ({toggleDrawer, open, applyCouponCode, isMonthly}) => {
  const [isApplied, setIsApplied] = React.useState(false);
  const [appliedIndex, setappliedIndex] = React.useState(null);
  const [input, setInput] = useState("");
  const [pageData, setPageData] = useState();

  const handleApplyClick = couponCode => {
    setIsApplied(true);
    if (couponCode !== "") applyCouponCode(couponCode);
    toggleDrawer();
  };

  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const getOffersAndCoupons = () => {
    axios
      .get(baseURL + endPoints.offersAndCupons + `?sortId=${isMonthly ? 0 : 1}`)
      .then(res => {
        console.log(res, "res in offer and copouns");
        setPageData(res?.data?.data);
      });
  };

  useEffect(() => {
    getOffersAndCoupons();
  }, []);

  const backgroundImageType1 =
    "https://d3juy0zp6vqec8.cloudfront.net/images/cfnewimagesmob/coupon1.webp";
  const backgroundImageType2 =
    "https://d3juy0zp6vqec8.cloudfront.net/images/icons/inactive-grey-coupon.webp";

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      {" "}
      <div className={styles.main_container}>
        <div className={styles.close_icon} onClick={toggleDrawer}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>

        <h2 className={styles.header}>Offers & coupons</h2>
        <div className={styles.input_div}>
          <input
            className={styles.input}
            placeholder="Enter Coupon code"
            onChange={e => setInput(e.target.value)}
          />
          <p
            className={styles.apply_text}
            onClick={() => {
              input !== "" && applyCouponCode(input);
              toggleDrawer();
            }}>
            Apply
          </p>
        </div>

        <div className={styles.coupons_wrapper}>
          {pageData?.map((item, index) => (
            <>
              <div
                key={index.toString()}
                style={{
                  background: isMonthly
                    ? item.coupon_type === 0
                      ? `url(${backgroundImageType1})`
                      : `url(${backgroundImageType2})`
                    : item.coupon_type === 0
                    ? `url(${backgroundImageType2})`
                    : `url(${backgroundImageType1})`,
                  cursor: isMonthly
                    ? item.coupon_type === 0
                      ? "pointer"
                      : "not-allowed"
                    : item.coupon_type === 0
                    ? "not-allowed"
                    : "pointer",
                }}
                className={`${styles.card}`}
                onClick={() => {
                  if (
                    (isMonthly && item.coupon_type === 0) ||
                    (!isMonthly && item.coupon_type === 1)
                  ) {
                    handleApplyClick(item.coupon_code);
                    setappliedIndex(index);
                    toggleDrawer();
                  }
                }}>
                <div className={`${styles.ellipse} ${styles.left}`}></div>
                <div className={`${styles.ellipse} ${styles.right}`}></div>
                <div className="xl:w-full">
                  <p
                    style={{
                      color: isMonthly
                        ? item.coupon_type === 0
                          ? "#CCC5F4"
                          : "#CCCCCC"
                        : item.coupon_type === 0
                        ? "#CCCCCC"
                        : "#CCC5F4",
                    }}
                    className={`${styles.desc}`}>{`${item?.price_text} ${
                    item?.max_discount !== "0"
                      ? `(up to Rs ${item?.max_discount})*`
                      : ""
                  } `}</p>
                  {item?.price_below_text && (
                    <p
                      style={{
                        color: isMonthly
                          ? item.coupon_type === 0
                            ? "#CCC5F4"
                            : "#CCCCCC"
                          : item.coupon_type === 0
                          ? "#CCCCCC"
                          : "#CCC5F4",
                      }}
                      className={`${styles.desc}`}>
                      {item?.price_below_text}
                    </p>
                  )}
                  <p className={styles.code}>
                    Use Code &quot;{item?.coupon_code}&quot;
                  </p>
                </div>
                <div
                  style={{
                    borderColor: isMonthly
                      ? item.coupon_type === 0
                        ? "#7e6dd5"
                        : "#B4B4B4"
                      : item.coupon_type === 0
                      ? "#B4B4B4"
                      : "#7e6dd5",
                  }}
                  className={styles.line}></div>
                <div className={styles.copy_div}>
                  <button id="copy-button" className="text-[#222] flex ">
                    {isApplied && appliedIndex === index ? "Applied!" : "Apply"}
                  </button>
                </div>
              </div>
              {((isMonthly && item.coupon_type === 1) ||
                (!isMonthly && item.coupon_type === 0)) && (
                <p className={styles.not_applicable_text}>
                  *Applicable for {`${isMonthly ? "upfront" : "monthly"}`}{" "}
                  payment only
                </p>
              )}
            </>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CouponDrawer;
