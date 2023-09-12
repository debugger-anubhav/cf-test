import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close, DownPopUpArrow, PopUpArrow} from "@/assets/icon";
import {useSelector} from "react-redux";

const TotalBreakup = ({toggleDrawer, open, billBreakup}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [showTotalPriceBreakdown, setShowTotalPriceBreakdown] = useState(false);
  const code = useSelector(state => state.cartPageData.couponCodeUsed);
  console.log(code);

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
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        <h1 className={styles.head}>Cart Breakup:</h1>
        <div className={styles.breakup_wrapper}>
          <div className={styles.row}>
            <div
              className={styles.left_div}
              onClick={() =>
                setShowTotalPriceBreakdown(!showTotalPriceBreakdown)
              }>
              <p className={styles.sub_total_text}>Cart Subtotal</p>
              {showTotalPriceBreakdown ? (
                <PopUpArrow color={"#5774AC"} size={20} />
              ) : (
                <DownPopUpArrow color={"#5774AC"} size={20} />
              )}
            </div>

            <p className={styles.total_amount}>
              <span className={styles.rupeeIcon}>₹</span>
              {billBreakup?.[0]?.cartSubTotal}
            </p>
          </div>

          {showTotalPriceBreakdown && (
            <>
              <div className={styles.dropdown_wrapper}>
                {billBreakup?.[0]?.cartSubTotalList?.map((item, index) => (
                  <div key={index} className={styles.dropdown_row}>
                    <p
                      className={`min-w-[190px] w-[190px] ${styles.prod_name}`}>
                      {item.name}
                    </p>
                    <p className={`min-w-fit ${styles.prod_name}`}>
                      {item.tenure}
                    </p>
                    <p className={styles.total_amount}>
                      <span className={styles.rupeeIcon}>₹</span>

                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Items discount</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <span className={styles.rupeeIcon}>-₹</span>
              {billBreakup?.[0]?.itemDiscount}
            </p>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Coupon discount {code}</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <span className={styles.rupeeIcon}>-₹</span>
              {billBreakup?.[0]?.couponDiscount}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Refundable Security Deposit</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <span className={styles.rupeeIcon}>₹</span>
              {billBreakup?.[0]?.refundableDeposite}
            </p>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Delivery & Installation fee</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <span className={styles.rupeeIcon}>₹</span>
              {billBreakup?.[0]?.deliveryAndInstallation}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>GST (18%)</p>
            </div>
            <p className={styles.total_amount}>
              <span className={styles.rupeeIcon}>₹</span>
              {billBreakup?.[0]?.gst}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Cityfurnish coins used</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <span className={styles.rupeeIcon}>-₹</span>
              {billBreakup?.[0]?.coinsUsed}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <p className={styles.total_txt}>Total</p>
            <p className={styles.total_amount}>
              <span className={styles.rupeeIcon}>₹</span>
              {billBreakup?.[0]?.finalTotalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      ;
    </Drawer>
  );
};

export default TotalBreakup;
