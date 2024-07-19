import React, {memo, useEffect, useRef, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {CopyIcon} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {offersAndCuponsList} from "@/store/Slices";
import {Skeleton} from "@mui/material";
import Worker from "worker-loader!./offersWorker.js";

const OffersAndCoupons = ({page}) => {
  const dispatch = useDispatch();
  const homePageData = useSelector(state => state.homePagedata);

  const cityId = homePageData.cityId;

  const [isCopied, setIsCopied] = useState(false);
  const [isDumy, setIsDumy] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const sliderRef = useRef(null);

  useEffect(() => {
    const worker = new Worker();
    worker.postMessage({cityId});

    worker.onmessage = function ({data: {data}}) {
      dispatch(offersAndCuponsList(data));
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const str = string.landing_page.OffersAndDiscount;

  const handleCopyClick = textToCopy => {
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = function () {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };
    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  return homePageData?.offerCoupons &&
    homePageData?.offerCoupons?.length > 0 ? (
    <div className={styles.wrapper}>
      <h2
        className={`${page === "product" && "xl:!text-24 xl:!tracking-0.48"} ${
          styles.heading
        }`}>
        {str.heading}
      </h2>
      <div className={styles.cards_wrapper} ref={sliderRef}>
        {homePageData?.offerCoupons?.map((item, index) => {
          const {coupon_code, price_text, max_discount, price_below_text} =
            item || {};
          return (
            <div
              key={index.toString()}
              className={styles.card}
              onClick={() => {
                handleCopyClick(coupon_code);
                setCopiedIndex(index);
              }}>
              <div className={`${styles.ellipse} ${styles.left}`}></div>
              <div className={`${styles.ellipse} ${styles.right}`}></div>
              <div className="xl:w-full">
                <p
                  className={`${styles.desc} !whitespace-normal lg:pr-6 3xl:pr-10 !w-full`}>
                  {`${price_text}
                   ${max_discount !== "0" ? `(up to Rs ${max_discount})*` : ""}
                   `}
                  {price_below_text && <>{price_below_text}</>}
                </p>
                <p className={styles.code}>Use Code {coupon_code}</p>
              </div>
              <div className={`${styles.line} `}></div>
              <div className={styles.copy_div}>
                {coupon_code && (
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
          );
        })}
      </div>
    </div>
  ) : (
    <div className="mt-8">
      <OffersSkeleton />
    </div>
  );
};
export default memo(OffersAndCoupons);

export const OffersSkeleton = memo(() => {
  return (
    <div className={`${styles.skeleton_wrapper}`}>
      <div className="w-[180px]">
        <Skeleton
          variant="text"
          className={styles.Skeleton_text}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={styles.offer_card_skeleton}>
        {[1, 2, 3, 4]?.map((item, index) => {
          return (
            <div key={index.toString()} className={styles.div_wrap}>
              <Skeleton
                variant="rectangular"
                className={styles.offer_coupon_skeleton}
                key={index.toString()}
                width={"100%"}
                height={"100%"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
