import React from "react";
import styles from "./style.module.css";

const StickyBottomBar = ({
  productName,
  duration,
  durationArray,
  handleButtonClick,
  isLoading,
  isItemInCart,
  soldOut,
}) => {
  const discount = Math.round(
    ((durationArray?.[0]?.attr_price -
      durationArray?.[duration.currentIndex]?.attr_price) *
      100) /
      durationArray?.[0]?.attr_price,
  ).toFixed(0);
  return (
    <div className={styles.sticky_bar_wrapper}>
      <p className={styles.sticky_bar_head}>{productName}</p>
      <div
        className={styles.deposit_div}
        style={{marginTop: "0px", gap: "16px"}}>
        <div>
          <p className={styles.deposit_txt}>Monthly Rent</p>
          <div className={styles.flexx}>
            <p className={styles.currentPrice}>
              <span className={styles.rupeeIcon}>₹</span>
              {durationArray?.[duration.currentIndex]?.attr_price}
            </p>
            <p
              className={styles.originalPrice}
              style={{
                display: duration.value === "3" ? "none" : "flex",
              }}>
              {durationArray?.[0]?.attr_price}
            </p>
            {discount > 0 && (
              <div
                className={styles.discount}
                style={{
                  display: duration.value === "3" ? "none" : "flex",
                }}>
                {/* {`-${Math.round(
                ((durationArray?.[0]?.attr_price -
                  durationArray?.[duration.currentIndex]?.attr_price) *
                  100) /
                  durationArray?.[0]?.attr_price,
              ).toFixed(0)}% OFF`} */}
                {`-${discount}% OFF`}
              </div>
            )}
          </div>
        </div>
        {/* <span className="text-[#9C9C9C]">+</span> */}
        {/* <div>
          <p className={styles.deposit_txt}>Security Deposit</p>
          <p className={styles.currentPrice}>
            <span className={styles.rupeeIcon}>₹</span>0
          </p>
        </div> */}
      </div>

      <button
        onClick={handleButtonClick}
        style={{width: "232px", marginTop: "0px"}}
        disabled={isLoading || isItemInCart || soldOut}
        className={styles.btn}>
        {isLoading ? (
          <div className={styles.spinner} />
        ) : soldOut ? (
          "Notify me"
        ) : isItemInCart ? (
          "In cart"
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
};

export default StickyBottomBar;
