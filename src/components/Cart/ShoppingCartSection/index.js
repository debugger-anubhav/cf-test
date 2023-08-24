import React, {useState} from "react";
import styles from "./style.module.css";
import {productImageBaseUrl} from "@/constants/constant";
import {FaRupeeSign} from "react-icons/fa";
import {DeleteIcon, VerifyIcon} from "@/assets/icon";
import {Checkbox} from "@mui/material";

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

  const [isCheckboxChecked, setCheckboxChecked] = useState(true);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleCheckboxToggle = () => {
    if (!isDrawerOpen) {
      setCheckboxChecked(!isCheckboxChecked);
    }
  };

  // const openDrawer = () => {
  //   setDrawerOpen(true);
  // };

  const closeDrawer = () => {
    setDrawerOpen(false);
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
                        <FaRupeeSign />
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
                        <FaRupeeSign />
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
              <Checkbox
                checked={isCheckboxChecked}
                onChange={handleCheckboxToggle}
              />
              {isDrawerOpen && (
                <CityShieldDrawerForCart onClose={closeDrawer} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartSection;
