import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import {productImageBaseUrl} from "@/constants/constant";
import {
  ArrowForw,
  Checked,
  DeleteIcon,
  Rupee,
  Unchecked,
  VerifyIcon,
} from "@/assets/icon";
import {FaToggleOff, FaToggleOn} from "react-icons/fa6";

import CityShieldDrawerForCart from "../Drawer/CityShieldDrawer";

const ShoppingCartSection = () => {
  const count = 5;
  const arr = [
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 80,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
    {
      img: "1583995987Alexa-queen-bed.jpg",
      product_name: "V-leg 4 Seater Dining Table",
      currentPrice: 1709,
      originalPrice: 1899,
      securityDeposit: 0,
    },
  ];

  const [isChecked, setIsChecked] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isCoinApplied, setIsCoinApplied] = useState(false);

  // const handleCheckboxToggle = () => {
  //   if (!isDrawerOpen) {
  //     setIsChecked(!isChecked);
  //   }
  // };

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  // const closeDrawer = () => {
  //   setDrawerOpen(false);
  // };

  useEffect(() => {
    console.log(isDrawerOpen, "isdrawer opennn");
  }, [isDrawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
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

                  <p
                    className={`${
                      item.securityDeposit === 0 ? "hidden" : "flex"
                    } ${styles.plus_icon}`}>
                    +
                  </p>

                  {item.securityDeposit !== 0 && (
                    <div>
                      <p className={styles.deposit_txt}>Security Deposit</p>
                      <p className={styles.currentPrice}>
                        <Rupee />
                        {item.securityDeposit}
                      </p>
                    </div>
                  )}
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
                  <Checked
                    size={20}
                    color={"#5774AC"}
                    className={"cursor-pointer"}
                  />
                </div>
              ) : (
                <div onClick={() => setIsChecked(true)}>
                  <Unchecked
                    size={20}
                    color={"#5774AC"}
                    className={"cursor-pointer"}
                  />
                </div>
              )}
              {isDrawerOpen && (
                <CityShieldDrawerForCart
                  toggleDrawer={toggleDrawer}
                  open={isDrawerOpen}
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

        <div className={styles.coupons_wrapper}>
          <p className={styles.offer_text}>
            Apply Offers & Coupons (save 20% Off) 🎉
          </p>
          {isCouponApplied ? (
            <p className={styles.remove_txt}>Remove</p>
          ) : (
            <ArrowForw
              onClick={() => setIsCouponApplied(true)}
              color={"#3E688E"}
              className={styles.arrow}
            />
          )}
        </div>

        <div className={styles.coins_div}>
          <div className={styles.coins_left_div}>
            <div>
              <img src="" className={styles.coin} />
            </div>
            <div>
              <p className={styles.coin_txt}>Use Cityfurnish coins</p>
              <p className={styles.avail_bal}>Available balance: 300</p>
            </div>
          </div>
          <div className="cursor-pointer">
            {isCoinApplied ? (
              <FaToggleOff
                size={29}
                color={"#E3E1DC"}
                onClick={() => setIsCoinApplied(false)}
              />
            ) : (
              <FaToggleOn
                color={"#5774AC"}
                size={29}
                onClick={() => setIsCoinApplied(true)}
              />
            )}
          </div>
        </div>

        <div className={styles.cart_breakup}>
          <div>
            <p className={styles.total_text}>Total:</p>
            <div className="flex gap-1 items-center mt-[11px]">
              <p className={styles.view_cart_text}>View cart breakup</p>
              <ArrowForw color={"#5774AC"} size={24} />
            </div>
          </div>
          <p className={styles.total_amount}>
            <Rupee />
            11,709
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSection;
