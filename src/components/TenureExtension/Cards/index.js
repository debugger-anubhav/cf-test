import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Close, RightIcon, VerifyIcon} from "@/assets/icon";
import DropDown from "@/components/Documentation/DropDown/DropDown";
import CityShieldDrawerForCart from "@/components/Cart/Drawer/CityShieldDrawer";
import {Skeleton} from "@mui/material";

function Cards({
  data,
  items,
  isChecked,
  setIsChecked,
  setcardIndex,
  index,
  cardIndex,
}) {
  const calculatedPrice =
    data?.orignalPrice -
    ((data?.orignalPrice * items?.percent_off) / 100).toFixed(0);
  const DiscountPoints = [
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    items?.monthOptions[0],
  );
  const [perAddModal, setPerAddModal] = useState(false);

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
    setIsChecked(true);
    setcardIndex(index);
  };
  const toggleDrawerCityShield = () => {
    if (isChecked) setCityShieldDrawerOpen(false);
    else setCityShieldDrawerOpen(true);
  };
  useEffect(() => {
    if (isChecked) setCityShieldDrawerOpen(false);
  }, [isChecked]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.card_type_text}>
        {items?.title}
        <span className={styles.card_type_span}>{items?.lightTitle}</span>
      </div>

      <div className={styles.monthly_rent_row}>
        <p className={styles.monthly_rent_text}>Monthly Rent</p>
        <div className={styles.price_row}>
          <p className={styles.price}>
            <span className="font-Inter"> ₹</span>
            {isNaN(data?.orignalPrice) ||
            isNaN(parseInt(items?.percent_off)) ? (
              <span className="flex gap-4">
                <Skeleton variant="text" className="flex" width={45} />
                <Skeleton variant="text" className="flex" width={45} />
              </span>
            ) : (
              calculatedPrice
            )}
            <span className={styles.price_span}>{data?.orignalPrice}</span>
          </p>
          <p className={styles.discount}>-{items?.percent_off}% OFF</p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <p className={styles.discount_point}>
          Get {items?.percent_off} discount on extension of your tenure by
          paying upfront.
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
      {!data?.isCityShieldApplied && (
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
                checked={!(cardIndex === index && !isChecked)}
              />
            </div>
          </div>
          <p className={styles.cityshield_text}>
            Get a damage waiver at ONLY <span className="font-Inter">₹</span>
            {data?.cityshieldAmount}/mo with City Shield.
            <span className={styles.learn_more}>Learn more</span>
          </p>
        </div>
      )}
      {cityShieldDrawerOpen && (
        <CityShieldDrawerForCart
          cityShieldCurrentPrice={calculatedPrice}
          cityShieldOriginalPrice={data?.orignalPrice}
          cityShieldDiscount={items?.percent_off}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpen}
          toggleCheckbox={bool => setIsChecked(bool)}
        />
      )}
      <div className={styles.select_month_wrapper}>
        <DropDown
          options={items?.monthOptions}
          setIsDDOpen={setPerAddModal}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
        />
      </div>

      <div>
        <p className={styles.total}>
          Total: <span className="font-Inter ml-1"> ₹</span>
          {selectedOptionPer?.value * calculatedPrice}
          <span className={styles.total_span}>
            for {selectedOptionPer?.label}
          </span>
        </p>
      </div>
      <div>
        <button className={styles.pay_now_btn}>Pay now</button>
      </div>
    </div>
  );
}

export default Cards;

export const MonthlyCard = ({
  data,
  monthlyCardIsChecked,
  setmonthlyCardIsChecked,
}) => {
  const DiscountPoints = [
    "No Discount",
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];

  const PaymentModeOpt = ["Credit/Debit card", "Netbanking", "UPI"];
  const [selectedOption, setSelectedOption] = useState(0);
  const [cityShieldDrawerOpenForMonthly, setcityShieldDrawerOpenForMonthly] =
    useState(false);

  const handleOptionChange = index => {
    setSelectedOption(index);
  };
  const openDrawerForMonthly = () => {
    if (monthlyCardIsChecked) setcityShieldDrawerOpenForMonthly(true);
    setmonthlyCardIsChecked(true);
  };
  const toggleDrawerCityShield = () => {
    if (monthlyCardIsChecked) setcityShieldDrawerOpenForMonthly(false);
    else setcityShieldDrawerOpenForMonthly(true);
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
            <span className="font-Inter">₹</span>
            {data?.orignalPrice}
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

      <div className={styles.cityshield_wrapper} onClick={openDrawerForMonthly}>
        <div className={`${styles.cityshield_row} `}>
          <div className={styles.flexx}>
            <VerifyIcon size={30} color={"#2D9469"} />
            <p className={styles.city_shield_head}>City shield </p>
          </div>
          <div>
            <input
              type="checkbox"
              className="flex border border-5774AC cursor-pointer"
              checked={monthlyCardIsChecked}
            />
          </div>
        </div>
        <p className={styles.cityshield_text}>
          Get a damage waiver at ONLY <span className="font-Inter">₹</span>56/mo
          with City Shield.
          <span className={styles.learn_more}>Learn more</span>
        </p>
      </div>
      {cityShieldDrawerOpenForMonthly && (
        <CityShieldDrawerForCart
          cityShieldCurrentPrice={data?.orignalPrice}
          // cityShieldOriginalPrice={data?.orignalPrice}
          // cityShieldDiscount={items?.percent_off}
          toggleDrawer={toggleDrawerCityShield}
          open={cityShieldDrawerOpenForMonthly}
          toggleCheckbox={bool => setmonthlyCardIsChecked(bool)}
        />
      )}
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
