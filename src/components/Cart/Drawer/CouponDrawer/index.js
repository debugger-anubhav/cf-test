import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";
import {useSelector} from "react-redux";
import OffersAndCoupons from "@/components/Home/OffersAndCoupons";

const CouponDrawer = ({toggleDrawer, open, applyCouponCode}) => {
  const pageData = useSelector(state => state.homePagedata.offerCoupons);

  const [isApplied, setIsApplied] = React.useState(false);
  const [appliedIndex, setappliedIndex] = React.useState(null);
  const [input, setInput] = useState("");

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
        <div className="hidden">
          <OffersAndCoupons />
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
            <div
              key={index.toString()}
              className={styles.card}
              onClick={() => {
                handleApplyClick(item.coupon_code);
                setappliedIndex(index);
                toggleDrawer();
              }}>
              <div className={`${styles.ellipse} ${styles.left}`}></div>
              <div className={`${styles.ellipse} ${styles.right}`}></div>
              <div className="xl:w-full">
                <p className={styles.desc}>{`${item?.price_text} ${
                  item?.max_discount !== "0"
                    ? `(up to Rs ${item?.max_discount})*`
                    : ""
                } `}</p>
                {item?.price_below_text && (
                  <p className={styles.desc}>
                    {item?.price_below_text.split(" ").slice(0, 7).join(" ")}
                  </p>
                )}
                <p className={styles.code}>Use Code {item?.coupon_code}</p>
              </div>
              <div className={styles.line}></div>
              <div className={styles.copy_div}>
                <button id="copy-button" className="text-[#222] flex ">
                  {isApplied && appliedIndex === index ? "Applied!" : "Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default CouponDrawer;
