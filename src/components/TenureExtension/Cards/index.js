import React, {useState} from "react";
import styles from "./style.module.css";
import {Close, RightIcon, VerifyIcon} from "@/assets/icon";
import DropDown from "@/components/Documentation/DropDown/DropDown";
import CityShieldDrawerForCart from "@/components/Cart/Drawer/CityShieldDrawer";

function Cards() {
  const DiscountPoints = [
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
  };
  const toggleDrawerCityShield = () => {
    setCityShieldDrawerOpen(!cityShieldDrawerOpen);
  };
  const monthOptions = [
    {label: "9 Months", value: "9 Month"},
    {label: "11 Months", value: "11 Months"},
    {label: "12 Months", value: "12 Months"},
    {label: "13 Months", value: "13 Months"},
    {label: "14 Months", value: "14 Months"},
    {label: "15 Months", value: "15 Months"},
    {label: "16 Months", value: "16 Months"},
  ];

  const [selectedOptionPer, setSelectedOptionPer] = useState(monthOptions[0]);
  const [perAddModal, setPerAddModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked);
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
            <span className="font-Inter"> ₹</span>
            1085<span className={styles.price_span}>1276</span>
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

      <div className={styles.cityshield_wrapper} onClick={openDrawer}>
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
      {cityShieldDrawerOpen && (
        <CityShieldDrawerForCart
          cityShieldCurrentPrice={"0284938493"}
          cityShieldOriginalPrice={"36473"}
          cityShieldDiscount={"12"}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpen}
          toggleCheckbox={bool => setIsChecked(bool)}
        />
      )}
      <div className={styles.select_month_wrapper}>
        <DropDown
          options={monthOptions}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
        />
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

export const MonthlyCard = () => {
  const DiscountPoints = [
    "No Discount",
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];

  const PaymentModeOpt = ["Credit/Debit card", "Netbanking", "UPI"];
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = index => {
    setSelectedOption(index);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_type_text}>
        Monthly Billing{" "}
        <span className={styles.card_type_span}>via Bank Mandate</span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            <span className="font-Inter">₹</span>1276
          </p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <div className="mt-4">
          {DiscountPoints?.map((item, index) => {
            return (
              <p className={styles.discount_point} key={index.toString()}>
                {index > 1 ? (
                  <RightIcon color={"#2D9469"} size={20} />
                ) : (
                  <Close color="#D96060" size={20} />
                )}
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

      <div className={styles.choose_payment_mode}>
        <p className={styles.payment_mode_heading}>
          Choose your preferred payment mode
        </p>

        <div>
          {PaymentModeOpt?.map((item, index) => {
            return (
              <div className={styles.radio_option} key={index.toString()}>
                <input
                  type="radio"
                  className={styles.radio_button}
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                />
                <label className={styles.radio_label}>{item}</label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <button className={styles.pay_now_btn}>Pay now</button>
      </div>
    </div>
  );
};
