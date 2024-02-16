import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {CheckedBox, RightIcon, UncheckedBox, VerifyIcon} from "@/assets/icon";
import DropDown from "@/components/Documentation/DropDown/DropDown";
import CityShieldDrawerForCart from "@/components/Cart/Drawer/CityShieldDrawer";
import {Skeleton} from "@mui/material";
import {RazorpayThemeColor, razorpayKeyOwn} from "../../../../appConfig";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import axios from "axios";
import {loadScript} from "@/constants/constant";
import {useRouter} from "next/navigation";
import {
  setAmountPaid,
  setPGTransactionID,
  setTransactionReferenceNumber,
} from "@/store/Slices";
import {useDispatch} from "react-redux";

function ShortTermCard({
  items,
  isChecked,
  setIsChecked,
  orderId,
  setLoading,
  dealCodeNumber,
}) {
  const [cityShieldDrawerOpen, setCityShieldDrawerOpen] = useState(false);
  const [selectedOptionPer, setSelectedOptionPer] = useState(
    items?.monthOptions[0],
  );
  const [perAddModal, setPerAddModal] = useState(false);
  const [tenureModal, setTenureModal] = useState(false);
  const [apiData, setApiData] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const calculatedPrice =
    apiData?.orignalPrice -
    ((apiData?.orignalPrice * items?.percent_off) / 100).toFixed(0);

  const DiscountPoints = [
    "No Cost EMI Available",
    "Inclusive GST",
    "No Security Deposit",
  ];

  const openDrawer = () => {
    setCityShieldDrawerOpen(true);
    setIsChecked(true);
  };
  const toggleDrawerCityShield = () => {
    if (isChecked) setCityShieldDrawerOpen(false);
    else setCityShieldDrawerOpen(true);
  };
  useEffect(() => {
    if (isChecked) setCityShieldDrawerOpen(false);
  }, [isChecked]);

  const cartTypeOneHandler = async (res, customerId, amount, recId) => {
    setLoading(true);
    const body = {
      razorpayPaymentId: res.razorpay_payment_id,
      dealCodeNumber: orderId,
      razorpayOrderId: res.razorpay_order_id,
      razCustomerId: customerId,
      razorpaySignature: res.razorpay_signature,
      mode: "extension",
      cf_value: apiData?.isCityShieldApplied ? 1 : 0,
      id: recId,
    };
    try {
      const result = await axios.post(
        baseURL + endPoints.addToCart.successPayment,
        body,
      );
      console.log(result);
      dispatch(setTransactionReferenceNumber(res.razorpay_order_id));
      dispatch(setPGTransactionID(res.razorpay_payment_id));
      dispatch(setAmountPaid(amount));
      setLoading(false);
      router.push("/success/payment");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  async function handleOpenRazorpay(cardType) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    console.log(res, " res in load script");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post(
      baseURL + endPoints.tenureExtensionCreateOrder,
      {
        dealCodeNumber: parseInt(orderId),
        mode: "extension",
        tenure: selectedOptionPer?.value,
        cf_value: isChecked && !apiData?.isCityShieldApplied ? 1 : 0,
      },
    );
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const razOrderId = result.data.data.raz_order_id;
    const customerId = result.data.data.customer_id;
    const recId = result?.data?.data?.data?.recID;

    const options = {
      key: razorpayKeyOwn,
      order_id: razOrderId,
      customer_id: customerId,
      name: "Cityfurnish",
      description: "Easy payment registration",
      image: "https://rentofurniture.com/images/logo/FaviconNew.png",
      handler: function (res) {
        console.log(res, "res in handler");
        cartTypeOneHandler(
          res,
          customerId,
          selectedOptionPer?.value * calculatedPrice,
          recId,
        );
      },
      prefill: {
        name: result?.data?.data?.data?.full_name,
        email: result?.data?.data?.data?.email,
        contact: result?.data?.data?.data?.phone_no,
      },
      theme: {
        color: RazorpayThemeColor,
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed:", response.error.description);
      alert("Payment failed: " + response.error.description);
    });

    paymentObject.open();
  }

  const getApiData = () => {
    axios
      .get(baseURL + endPoints.tenureExtension, {
        params: {
          cfCareValue: isChecked ? 1 : 0,
          dealCodeNumber,
          month: selectedOptionPer.value,
        },
      })
      .then(res => {
        setApiData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getApiData();
  }, [selectedOptionPer]);

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
            {isNaN(apiData?.orignalPrice) ||
            isNaN(parseInt(items?.percent_off)) ? (
              <span className="flex gap-4">
                <Skeleton variant="text" className="flex" width={45} />
                <Skeleton variant="text" className="flex" width={45} />
              </span>
            ) : (
              <>{apiData?.discountedPrice}</>
            )}
            <span className={`${styles.price_span} font-normal font-Poppins`}>
              <span className="font-Inter"> ₹</span>
              {apiData?.orignalPrice}
            </span>
          </p>
          <p className={styles.discount}>-{items?.percent_off}% OFF</p>
        </div>
        <p className={styles.gst_text}>Inclusive of GST</p>
      </div>

      <div className={styles.discount_detail}>
        <p className={styles.discount_point}>
          Get {items?.percent_off}% discount on extension of your tenure by
          paying upfront.
        </p>
        <div className="mt-4">
          {DiscountPoints?.map((item, index) => {
            return (
              <p className={styles.discount_point} key={index.toString()}>
                <span className="flex gap-1">
                  <RightIcon color={"#2D9469"} size={20} />
                  {item}
                </span>
              </p>
            );
          })}
          <p className={styles.discount_point}>
            {apiData?.isCityShieldApplied && (
              <span className="flex gap-1">
                <RightIcon color={"#2D9469"} size={20} />
                City Shield
              </span>
            )}
          </p>
        </div>
      </div>

      <div className={styles.divider}></div>
      {!apiData?.isCityShieldApplied && (
        <div className={styles.cityshield_wrapper} onClick={openDrawer}>
          <div className={`${styles.cityshield_row} `}>
            <div className={styles.flexx}>
              <VerifyIcon size={30} color={"#2D9469"} />
              <p className={styles.city_shield_head}>City shield </p>
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
                <div
                  onClick={() => {
                    // setIsCheckedArray(prevState => {
                    //   const newArray = [...prevState];
                    //   newArray[index] = !newArray[index];
                    //   return newArray;
                    // });
                    setIsChecked(false);
                  }}>
                  <UncheckedBox
                    size={20}
                    color={"#5774AC"}
                    className={"cursor-pointer"}
                  />
                </div>
              )}
            </div>
          </div>
          <p className={styles.cityshield_text}>
            Get a damage waiver at ONLY <span className="font-Inter">₹</span>
            {Number(apiData?.cityShieldAmount).toFixed(2)}/mo with City Shield.
            <span className={styles.learn_more}>Learn more</span>
          </p>
        </div>
      )}
      <CityShieldDrawerForCart
        cityShieldCurrentPrice={calculatedPrice}
        cityShieldOriginalPrice={apiData?.orignalPrice}
        cityShieldDiscount={items?.percent_off}
        toggleDrawer={toggleDrawerCityShield}
        open={cityShieldDrawerOpen}
        toggleCheckbox={bool => setIsChecked(bool)}
      />

      <div className={styles.select_month_wrapper}>
        <DropDown
          options={items?.monthOptions}
          setIsDDOpen={val => setPerAddModal(val)}
          setPerAddModal={val => setPerAddModal(val)}
          selectedOption={selectedOptionPer}
          isOpen={perAddModal}
          setSelectedOption={setSelectedOptionPer}
          tenureStyle={true}
          setTenureModal={val => setTenureModal(val)}
          tenureModal={tenureModal}
        />
      </div>

      <div>
        <p className={styles.total}>
          Total: <span className="font-Inter ml-1"> ₹</span>
          {/* {selectedOptionPer?.value * calculatedPrice} */}
          {apiData?.totalPrice}
          <span className={styles.total_span}>
            for {selectedOptionPer?.label}
          </span>
        </p>
      </div>
      <div>
        <button onClick={handleOpenRazorpay} className={styles.pay_now_btn}>
          Pay now
        </button>
      </div>
    </div>
  );
}

export default ShortTermCard;
