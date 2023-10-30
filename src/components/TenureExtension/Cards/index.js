import React from "react";
import styles from "./style.module.css";
import {RightIcon, VerifyIcon} from "@/assets/icon";

function Cards() {
  const DiscountPoints = [
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_type_text}>
        Long-term pack{" "}
        <span className={styles.card_type_span}>(9 months+)</span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            ₹1085<span className={styles.price_span}>1276</span>
          </p>
          <p className={styles.discount}>-15% OFF</p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <p className={styles.discount_point}>
          Get 15% discount on extension of your tenure by paying upfront.
        </p>
        <div className="mt-4">
          {DiscountPoints?.map((item, index) => {
            return (
              <p className={styles.discount_point} key={index.toString()}>
                <RightIcon color={"#2D9469"} size={20} />
                {item}
              </p>
            );
          })}
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.cityshield_wrapper}>
        <div className={`${styles.cityshield_row} `}>
          <div className={styles.flexx}>
            <VerifyIcon size={30} color={"#2D9469"} />
            <p className={styles.city_shield_head}>City shield </p>
          </div>
          <div>
            <input
              type="checkbox"
              className="flex border border-5774AC cursor-pointer"
            />
          </div>
        </div>
        <p className={styles.cityshield_text}>
          Get a damage waiver at ONLY <span className="font-Inter">₹</span>56/mo
          with City Shield.
          <span className={styles.learn_more}>Learn more</span>
        </p>
      </div>
      <div>
        <p className={styles.total}>
          Total: <span className="font-Inter ml-1"> ₹</span>12,936{" "}
          <span className={styles.total_span}>for 9 months</span>
        </p>
      </div>
      <div>
        <button className={styles.pay_now_btn}>Pay now</button>
      </div>
    </div>
  );
}

export default Cards;
