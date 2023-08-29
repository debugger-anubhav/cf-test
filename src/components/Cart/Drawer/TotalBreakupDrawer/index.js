import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close, DownPopUpArrow, PopUpArrow, Rupee} from "@/assets/icon";

const TotalBreakup = ({
  toggleDrawer,
  totalAmount = 19000,
  totalDiscount = -1200,
  code = "WELCOME10",
  open,
  totalPayable = "25000",
  arr,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [showTotalPriceBreakdown, setShowTotalPriceBreakdown] = useState(false);

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

  const gst = (totalAmount * 18) / 100;

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
              <Rupee className={styles.rupeeIcon} />
              {totalAmount}
            </p>
          </div>

          {showTotalPriceBreakdown && (
            <>
              <div className={styles.dropdown_wrapper}>
                {arr.map((item, index) => (
                  <div key={index} className={styles.dropdown_row}>
                    <p className={`min-w-[190px] ${styles.prod_name}`}>
                      {item.product_name}
                    </p>
                    <p className={`min-w-fit ${styles.prod_name}`}>12 months</p>
                    <p className={styles.total_amount}>
                      <span>
                        <Rupee className={styles.rupeeIcon} />
                      </span>
                      {item.originalPrice}
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
              <Rupee className={styles.rupeeIcon} />
              {totalDiscount}
            </p>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Coupon discount {code}</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <Rupee className={styles.rupeeIcon} />
              {totalDiscount}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Refundable Security Deposit</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <Rupee className={styles.rupeeIcon} />0
            </p>
          </div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Delivery & Installation fee</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <Rupee className={styles.rupeeIcon} />0
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>GST (18%)</p>
            </div>
            <p className={styles.total_amount}>
              <Rupee className={styles.rupeeIcon} />
              {gst}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <div>
              <p className={styles.price_label}>Cityfurnish coins used</p>
            </div>
            <p className={styles.total_amount} style={{color: "#2D9469"}}>
              <Rupee className={styles.rupeeIcon} />
              {"500"}
            </p>
          </div>

          <div className={styles.line}></div>

          <div className={styles.row}>
            <p className={styles.total_txt}>Total</p>
            <p className={styles.total_amount}>
              <Rupee className={styles.rupeeIcon} />
              {totalPayable}
            </p>
          </div>
        </div>
      </div>
      ;
    </Drawer>
  );
};

export default TotalBreakup;
