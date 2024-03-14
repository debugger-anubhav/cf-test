import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import commonStyles from "@/components/Home/OffersAndCoupons/style.module.css";
import {endPoints} from "@/network/endPoints";
import {useSelector} from "react-redux";
import {CopyIcon} from "@/assets/icon";
import content from "@/constants/Constant.json";
import {Skeleton} from "@mui/material";
import {baseInstance} from "@/network/axios";

const OfferPage = () => {
  // const homePageData = useSelector(state => state.homePagedata);
  const cartItems = useSelector(state => state.cartPageData.cartItems);
  const appliedCouponCode = cartItems?.[0]?.couponCode;
  // const cityId = homePageData.cityId;
  const [isCopied, setIsCopied] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState(null);
  const [coupons, setCoupons] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const getOfferCoupons = () => {
    baseInstance
      .get(endPoints.offersAndCuponsForOfferPage)
      .then(res => {
        setCoupons(res?.data?.data);
        setSkeletonLoading(false);
      })
      .catch(err => {
        console.log(err?.message || "some error");
        setSkeletonLoading(false);
      });
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
      <div className="flex">
        <h1 className={styles.header}>
          Offers
          <span>
            <img
              src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
              alt="paty_icon"
              className="w-[24px] h-[24px] ml-2 inline-block"
              loading="lazy"
            />
          </span>
        </h1>
      </div>
      {/* <h1 className={styles.header}>Offers 🎉</h1> */}
      <div className="flex flex-col">
        {skeletonLoading ? (
          <OffersPageSkeleton />
        ) : (
          <div className={styles.coupons_wrapper}>
            {coupons
              ?.filter(item => item?.coupon_code !== appliedCouponCode)
              .map((item, index) => (
                <div key={index} className={styles.card_wrapper}>
                  <p className={styles.top_label}>
                    {item?.price_text}{" "}
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
                      <p className={styles.offer_txt}>{`${item?.price_text} ${
                        item?.max_discount !== "0"
                          ? `(up to Rs ${item?.max_discount})`
                          : ""
                      } `}</p>
                      <p className={commonStyles.code}>
                        Use Code {item?.coupon_code}
                      </p>
                    </div>
                    <div className={styles.line}></div>
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
                        ? `(up to Rs ${appliedCouponObject[0]?.max_discount})`
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

export const OffersPageSkeleton = () => {
  return (
    <div className={styles.main_container_skeleton}>
      <div className={styles.skeleton_data}>
        {[1, 2, 3]?.map(ele => {
          return (
            <div
              className={styles.coupons_wrapper_skeleton}
              key={ele.toString()}>
              <Skeleton variant="text" className={"w-full h-4"} />
              <div className="w-full h-20 my-2">
                <Skeleton
                  variant="rectangular"
                  className={styles.Skeleton_full}
                />
              </div>
              <div className={styles.Skeleton_points_wrapper}>
                {[1, 2, 3, 4]?.map(item => {
                  return (
                    <div
                      key={item.toString()}
                      className={styles.skeleton_point}>
                      <Skeleton
                        variant="circular"
                        className={`!w-2 !h-2 mr-2`}
                      />

                      <Skeleton
                        variant="text"
                        className={`${styles.Skeleton_full} !h-4`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
