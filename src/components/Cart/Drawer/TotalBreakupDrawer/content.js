import React from "react";
import styles from "./styles.module.css";
import {DownPopUpArrow, PopUpArrow} from "@/assets/icon";
import {useSelector} from "react-redux";

const BillContent = ({
  isCouponApplied,
  isBottomDrawer,
  setShowTotalPriceBreakdown,
  showTotalPriceBreakdown,
  isOfflineInvoice,
}) => {
  const code = useSelector(state => state.cartPageData.couponCodeUsed);
  const billBreakup = useSelector(state => state.cartPageData.billBreakout);
  console.log(billBreakup, "ue");

  return (
    <>
      <div className={styles.breakup_wrapper}>
        <div className={styles.row}>
          <div
            className={styles.left_div}
            onClick={() =>
              setShowTotalPriceBreakdown(!showTotalPriceBreakdown)
            }>
            <p
              className={`${isOfflineInvoice && "!text-71717A !no-underline"} ${
                styles.sub_total_text
              }`}>
              Cart Subtotal {isBottomDrawer && "(view details)"}
            </p>

            {!isBottomDrawer &&
              !isOfflineInvoice &&
              (showTotalPriceBreakdown ? (
                <PopUpArrow color={"#5774AC"} size={20} />
              ) : (
                <DownPopUpArrow color={"#5774AC"} size={20} />
              ))}
          </div>

          <p className={styles.total_amount}>
            <span className={styles.rupeeIcon}>₹</span>
            {billBreakup?.cartSubTotal}
          </p>
        </div>

        {(showTotalPriceBreakdown || isOfflineInvoice) && (
          <>
            <div className={styles.dropdown_wrapper}>
              {billBreakup?.cartSubTotalList?.map((item, index) => (
                <div key={index} className={styles.dropdown_row}>
                  <p
                    className={`xl:min-w-[190px] w-[190px] ${styles.prod_name}`}>
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
            {billBreakup?.itemDiscount}
          </p>
        </div>

        <div className={styles.row}>
          <div>
            <p className={styles.price_label}>
              Coupon discount {isCouponApplied && code}
            </p>
          </div>
          <p className={styles.total_amount} style={{color: "#2D9469"}}>
            <span className={styles.rupeeIcon}>-₹</span>
            {billBreakup?.couponDiscount}
          </p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.row}>
          <div>
            <p className={styles.price_label}>Refundable Security Deposit</p>
          </div>
          <p className={styles.total_amount} style={{color: "#2D9469"}}>
            <span className={styles.rupeeIcon}>₹</span>
            {billBreakup?.refundableDeposite}
          </p>
        </div>

        <div className={styles.row}>
          <div>
            <p className={styles.price_label}>Delivery & Installation fee</p>
          </div>
          <p className={styles.total_amount} style={{color: "#2D9469"}}>
            <span className={styles.rupeeIcon}>₹</span>
            {billBreakup?.deliveryAndInstallation}
          </p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.row}>
          <div>
            <p className={styles.price_label}>GST (18%)</p>
          </div>
          <p className={styles.total_amount}>
            <span className={styles.rupeeIcon}>₹</span>
            {billBreakup?.gst}
          </p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.row}>
          <div>
            <p className={styles.price_label}>Cityfurnish coins used</p>
          </div>
          <p className={styles.total_amount} style={{color: "#2D9469"}}>
            <span className={styles.rupeeIcon}>-₹</span>
            {billBreakup?.coinsUsed}
          </p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.row}>
          <p className={styles.total_txt}>Total</p>
          <p className={styles.total_amount}>
            <span className={styles.rupeeIcon}>₹</span>
            {billBreakup?.finalTotalPrice?.toFixed(2)}
          </p>
        </div>
      </div>
    </>
  );
};

export default BillContent;
