import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import commonStyles from "@/components/Home/OffersAndCoupons/style.module.css";
import axios from "axios";
import {endPoints} from "@/network/endPoints";
import {baseURL} from "@/network/axios";
import {useSelector} from "react-redux";
import {CopyIcon} from "@/assets/icon";
import content from "@/constants/Constant.json";

const OfferPage = () => {
  const homePageData = useSelector(state => state.homePagedata);
  const cartItems = useSelector(state => state.cartPageData.cartItems);
  const appliedCouponCode = cartItems?.[0]?.couponCode;
  const cityId = homePageData.cityId;
  const [isCopied, setIsCopied] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState(null);
  const [coupons, setCoupons] = useState([]);

  const getOfferCoupons = () => {
    axios
      .get(baseURL + endPoints.offersAndCupons + `?cityId=${cityId}`)
      .then(res => setCoupons(res?.data?.data))
      .catch(err => console.log(err));
  };

  const appliedCouponObject = coupons.filter(
    item => item?.coupon_code === appliedCouponCode,
  );

  const handleCopyClick = textToCopy => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    try {
      document.execCommand("copy");
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset "isCopied" after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    document.body.removeChild(tempTextArea);
  };

  useEffect(() => {
    getOfferCoupons();
  }, []);

  return (
    <div className={styles.main_container}>
      <h1 className={styles.header}>Offers 🎉</h1>
      <div className={styles.coupons_wrapper}>
        {coupons
          ?.filter(item => item?.coupon_code !== appliedCouponCode)
          .map((item, index) => (
            <div key={index} className={styles.card_wrapper}>
              <p className={styles.top_label}>
                {item?.price_text}
                <span className={styles.top_label_span}>
                  {item?.price_below_text}
                </span>
              </p>
              <div
                className={`mt-3 ${styles.coupon_card}`}
                onClick={() => {
                  handleCopyClick(item.coupon_code);
                  setCopiedIndex(index);
                }}>
                <div
                  className={`3xl:!top-[42px] ${commonStyles.ellipse} ${commonStyles.left}`}></div>
                <div
                  className={`3xl:!top-[42px] ${commonStyles.ellipse} ${commonStyles.right}`}></div>
                <div className="xl:w-full">
                  <p className={commonStyles.desc}>{`${item?.price_text} ${
                    item?.max_discount !== "0"
                      ? `(up to Rs ${item?.max_discount})*`
                      : ""
                  } `}</p>
                  <p className={commonStyles.code}>
                    Use Code {item?.coupon_code}
                  </p>
                </div>
                <div className={commonStyles.line}></div>
                <div className={commonStyles.copy_div}>
                  {item?.coupon_code && (
                    <button id={index} className="text-[#222] flex ">
                      {isCopied && copiedIndex === index ? (
                        "Copied!"
                      ) : (
                        <>
                          <CopyIcon
                            size={20}
                            color={"black"}
                            className={"mr-1"}
                          />
                          Copy
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
              <div className={styles.bottom_description}>
                {item?.description?.map(item => (
                  <div key={index} className={styles.desc_row}>
                    <div className={styles.dot}></div>
                    <p className={styles.desc}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        {cartItems?.[0]?.is_coupon_used === "Yes" && (
          <div className={styles.card_wrapper}>
            <p className={styles.top_label}>
              {appliedCouponObject[0]?.price_text}
            </p>
            <div className={styles.coupon_card}>
              <div
                className={`3xl:!top-[42px] ${commonStyles.ellipse} ${commonStyles.left}`}></div>
              <div
                className={`3xl:!top-[42px] ${commonStyles.ellipse} ${commonStyles.right}`}></div>
              <div className="xl:w-full">
                <p className={commonStyles.desc}>{`${
                  appliedCouponObject[0]?.price_text
                } ${
                  appliedCouponObject[0]?.max_discount !== "0"
                    ? `(up to Rs ${appliedCouponObject[0]?.max_discount})*`
                    : ""
                } `}</p>
                <p className={commonStyles.code}>Applied at checkout</p>
              </div>
              <div className={commonStyles.line}></div>
            </div>
            <div className={styles.bottom_description}>
              {appliedCouponObject[0]?.description?.map((item, index) => (
                <div key={index} className={styles.desc_row}>
                  <div className={styles.dot}></div>
                  <p className={styles.desc}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.terms_wrapper}>
        <h2 className={styles.terms_heading}>Terms and Conditions:</h2>
        <div className={styles.terms_list}>
          {content?.offer_page?.map((item, index) => (
            <div key={index} className={styles.desc_row}>
              <div className={styles.dot}></div>
              <p className={styles.terms_desc}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferPage;
