import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {useSelector} from "react-redux";

const CouponDrawer = ({
  toggleDrawer,
  open,
  applyCouponCode,
  isMonthly,
  cityId,
  totalAmount,
  isCouponApplied,
}) => {
  const [isApplied, setIsApplied] = React.useState(false);
  const [appliedIndex, setappliedIndex] = React.useState(null);
  const [input, setInput] = useState("");
  const [pageData, setPageData] = useState();
  const [showError, setShowError] = useState(false);
  const [couponStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const data = useSelector(state => state.cartPageData);
  // const billBreakup = data.billBreakup;
  const cartItems = data.cartItems;

  const idsArr = [];

  cartItems.map(item => {
    return idsArr.push(item.fc_product.id.toString());
  });

  const handleApplyClick = async couponCode => {
    setShowError(false);
    try {
      const headers = {
        productIds: idsArr,
        couponCode,
        cartSubTotal: totalAmount,
        paymentMode: isMonthly ? 0 : 1,
        cityId,
        tenure: cartItems?.[0]?.subproduct?.attr_name,
      };
      const res = await baseInstance.post(
        endPoints.addToCart.checkCouponApplicability,
        headers,
      );
      if (res?.data?.data?.status) {
        setIsApplied(true);
        if (couponCode !== "") applyCouponCode(couponCode);
        toggleDrawer();
      } else {
        setErrorMsg(res?.data?.data?.msg);
        setShowError(true);
      }
    } catch (err) {
      console.log(err?.message || "some error");
    }
  };

  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  const getOffersAndCoupons = () => {
    baseInstance
      .get(endPoints.offersAndCupons + `?sortId=${isMonthly ? 0 : 1}`)
      .then(res => {
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

  const getTextColor = (item, isMonthly) => {
    if (isMonthly) {
      return item.coupon_type !== 1 ? "#CCC5F4" : "#CCCCCC";
    } else {
      return item.coupon_type === 0 ? "#CCCCCC" : "#CCC5F4";
    }
  };

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

        <div className="overflow-scroll max-h-[100vh]">
          <h2 className={styles.header}> Apply Coupon</h2>
          <div className={styles.input_div}>
            <input
              className={styles.input}
              placeholder="Enter Coupon code"
              onChange={e => {
                setInput(e.target.value);
                // input !== " " && handleApplyClick(input);
              }}
            />
            <p
              className={styles.apply_text}
              onClick={() => {
                input !== " " && handleApplyClick(input);
                // toggleDrawer();
              }}>
              Apply
            </p>
          </div>

          {!couponStatus && showError && (
            <p className={styles.error}>{errorMsg}</p>
          )}

          <div className={styles.coupons_wrapper}>
            {pageData?.map((item, index) => (
              <>
                <div
                  key={index.toString()}
                  style={{
                    background: isMonthly
                      ? item.coupon_type === 0 || item.coupon_type === 2
                        ? `url(${backgroundImageType1})`
                        : `url(${backgroundImageType2})`
                      : item.coupon_type === 0
                        ? `url(${backgroundImageType2})`
                        : `url(${backgroundImageType1})`,
                    cursor: isMonthly
                      ? item.coupon_type === 0 || item.coupon_type === 2
                        ? "pointer"
                        : "not-allowed"
                      : item.coupon_type === 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                  className={`${styles.card}`}
                  onClick={() => {
                    if (
                      (isMonthly && item.coupon_type !== 1) ||
                      (!isMonthly && item.coupon_type !== 0)
                    ) {
                      handleApplyClick(item.coupon_code);
                      setappliedIndex(index);
                    }
                  }}>
                  <div className={`${styles.ellipse} ${styles.left}`}></div>
                  <div className={`${styles.ellipse} ${styles.right}`}></div>
                  <div className="xl:w-[210px]">
                    <p
                      style={{
                        color: getTextColor(item, isMonthly),
                      }}
                      className={`${styles.desc}`}>
                      {`${item?.price_text}
                         ${
                           item?.max_discount !== "0"
                             ? `(up to Rs ${item?.max_discount})*`
                             : ""
                         } `}
                    </p>
                    {item?.price_below_text && (
                      <p
                        style={{
                          color: getTextColor(item, isMonthly),
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
                        ? item.coupon_type !== 1
                          ? "#7e6dd5"
                          : "#B4B4B4"
                        : item.coupon_type === 0
                          ? "#B4B4B4"
                          : "#7e6dd5",
                    }}
                    className={styles.line}></div>
                  <div className={styles.copy_div}>
                    <button
                      id={index}
                      className="text-[#222] flex"
                      style={{
                        cursor: isMonthly
                          ? item.coupon_type !== 1
                            ? "pointer"
                            : "not-allowed"
                          : item.coupon_type === 0
                            ? "not-allowed"
                            : "pointer",
                      }}>
                      {isApplied && isCouponApplied && appliedIndex === index
                        ? "Applied!"
                        : "Apply"}
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
      </div>
    </Drawer>
  );
};

export default CouponDrawer;
