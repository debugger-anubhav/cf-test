import React, {useState} from "react";
import styles from "./style.module.css";
import {categoryIconsUrl, productImageBaseUrl} from "@/constants/constant";
import {
  ArrowForw,
  CheckedBox,
  DeleteIcon,
  RightIcon,
  Rupee,
  UncheckedBox,
  VerifyIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";

import CityShieldDrawerForCart from "../Drawer/CityShieldDrawer";
import CouponDrawer from "../Drawer/CouponDrawer";

const ShoppingCartSection = () => {
  const count = 5;
  const arr = [
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
    },
  ];

  const monthlyModeFeatures = [
    "Get additional coupon upto 8%",
    "Pay as you use",
    "Mandatory Security Deposit",
  ];
  const upfrontModeFeatures = [
    "Get additional coupons upto 20%",
    "Faster KYC",
    "No Security Deposit",
  ];

  const [isChecked, setIsChecked] = useState(true);
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCoinApplied, setIsCoinApplied] = useState(false);
  const [isMonthly, setIsMonthly] = useState(true);

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
  };
  const availCoin = 300;

  // const closeDrawer = () => {
  //   setCityShieldDrawerOpen(false);
  // };

  const toggleDrawerCityShield = () => {
    setCityShieldDrawerOpen(!cityShieldDrawerOpen);
  };

  const toggleDrawerCoupon = () => {
    setCouponDrawerOpen(!couponDrawerOpen);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <h1 className={styles.head}>Shopping cart ({count})</h1>
        <div className={styles.card_wrapper}>
          {arr.map((item, index) => (
            <div key={index} className={styles.single_product_wrapper}>
              <div className={styles.img_div}>
                <img
                  src={`${productImageBaseUrl + "thumb/" + item.img}`}
                  alt="product_img"
                  className={styles.img}
                />
              </div>

              <div>
                <div className={styles.name_div}>
                  <p className={styles.product_name}>{item.product_name}</p>
                  <DeleteIcon className={styles.delete_icon} />
                </div>

                <div className={styles.price_div}>
                  <div className={styles.incre_decre_div}>
                    <span className={styles.span_item}>-</span>1
                    <span className={styles.span_item}>+</span>
                  </div>

                  <div>
                    <p className={styles.deposit_txt}>Monthly Rent</p>
                    <div className="flex items-end gap-2">
                      <p className={styles.currentPrice}>
                        <Rupee />
                        {item.currentPrice}
                      </p>
                      <p className={styles.originalPrice}>
                        {item.originalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right_div}>
        <div className={styles.city_shield_div}>
          <div className={styles.city_shield_head_div}>
            <div className={styles.verify_icon_div}>
              <VerifyIcon size={24} color={"#2D9469"} />
              <p className={styles.city_shield_head}>Cityshield </p>
            </div>
            <div>
              {isChecked ? (
                <div onClick={openDrawer}>
                  <CheckedBox
                    size={20}
                    color={"#5774AC"}
                    className={"cursor-pointer"}
                  />
                </div>
              ) : (
                <div onClick={() => setIsChecked(true)}>
                  <UncheckedBox
                    size={20}
                    color={"#5774AC"}
                    className={"cursor-pointer"}
                  />
                </div>
              )}
              {cityShieldDrawerOpen && (
                <CityShieldDrawerForCart
                  toggleDrawer={toggleDrawerCityShield}
                  open={cityShieldDrawerOpen}
                  toggleCheckbox={() => setIsChecked(false)}
                />
              )}
            </div>
          </div>

          <p>Insurance value</p>
          <div className="flex items-end gap-2">
            <p className={styles.currentPrice}>
              <Rupee />
              250/mo
            </p>
            <p className={styles.originalPrice}>400/mo</p>
            <div className={styles.discount}>-40% OFF</div>
          </div>
          <p className={styles.protect_text}>
            Protect your appliances and furniture worth ₹70,000.{" "}
            <span className={styles.learn_more} onClick={openDrawer}>
              Learn more
            </span>
          </p>
        </div>

        <div className={styles.coins_div}>
          <div className={styles.coins_left_div}>
            <div>
              <img
                src={`${categoryIconsUrl + "cf_coin.svg"}`}
                className={styles.coin}
              />
            </div>
            <div>
              <p className={styles.coin_txt}>Use Cityfurnish coins</p>
              <p className={styles.avail_bal}>
                Available balance: {isCoinApplied ? 0 : availCoin}
              </p>
            </div>
          </div>
          <div className="cursor-pointer">
            {isCoinApplied ? (
              <FaToggleOn
                size={29}
                color={"#5774AC"}
                onClick={() => setIsCoinApplied(false)}
              />
            ) : (
              <FaToggleOff
                color={"#E3E1DC"}
                size={29}
                onClick={() => setIsCoinApplied(true)}
              />
            )}
          </div>
        </div>

        <div className={styles.coupons_wrapper}>
          <p className={styles.offer_text}>Apply Offers & Coupons🎉</p>
          {isCouponApplied ? (
            <p className={styles.remove_txt}>Remove</p>
          ) : (
            <div onClick={() => setCouponDrawerOpen(true)}>
              <ArrowForw color={"#3E688E"} className={styles.arrow} />
            </div>
          )}

          {couponDrawerOpen && (
            <CouponDrawer
              toggleDrawer={toggleDrawerCoupon}
              open={couponDrawerOpen}
              applyCoupon={setIsCouponApplied}
            />
          )}
        </div>

        <div className={styles.payment_mode}>
          <h2 className={styles.pref_mode_head}>Preferred payment mode:</h2>
          <div className={styles.monthly_toggler}>
            <p
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
                  : "bg-transparent"
              } ${styles.pref_mode_text}`}>
              Monthly
            </p>
            <p
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "bg-transparent"
                  : "bg-[#5774AC] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)]"
              } ${styles.pref_mode_text}`}>
              Upfront
            </p>
          </div>
          <div className={styles.pref_mode_features_wrappper}>
            {isMonthly
              ? monthlyModeFeatures.map((item, index) => (
                  <ul key={index} className={styles.payment_mode_list}>
                    <RightIcon color={"#2D9469"} size={13} />
                    <li className={styles.payment_mode_feature}>{item}</li>
                  </ul>
                ))
              : upfrontModeFeatures.map((item, index) => (
                  <ul key={index} className={styles.payment_mode_list}>
                    <RightIcon color={"#2D9469"} size={13} />
                    <li className={styles.payment_mode_feature}>{item}</li>
                  </ul>
                ))}
          </div>
        </div>

        <div className={styles.cart_breakup}>
          <div>
            <p className={styles.total_text}>Total:</p>
            <div className={styles.breakup_wrapper}>
              <p className={styles.view_cart_text}>View cart breakup</p>
              <ArrowForw color={"#5774AC"} className={styles.for_arrow} />
            </div>
          </div>
          <p className={styles.total_amount}>
            <Rupee className={styles.rupeeIcon} />
            11,709
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSection;
