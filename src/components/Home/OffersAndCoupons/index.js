import React, {useEffect, useRef} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {CopyIcon} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";
import {offersAndCuponsList} from "@/store/Slices";
import {Skeleton} from "@mui/material";

const OffersAndCoupons = ({page}) => {
  const dispatch = useDispatch();
  const homePageData = useSelector(state => state.homePagedata);
  const cityId = homePageData.cityId;
  const [isCopied, setIsCopied] = React.useState(false);
  const [isDumy, setIsDumy] = React.useState(false);
  const [copiedIndex, setCopiedIndex] = React.useState(null);

  const {refetch: getOfferCupon} = useQuery(
    "offer-cuopons",
    endPoints.offersAndCupons,
    `?cityId=${cityId}`,
  );

  useEffect(() => {
    getOfferCupon()
      .then(res => {
        dispatch(offersAndCuponsList(res?.data?.data));
      })
      .catch(err => console.log(err?.message || "some error"));
  }, []);

  const str = string.landing_page.OffersAndDiscount;

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
  const sliderRef = useRef(null);

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

  return homePageData?.offerCoupons ? (
    <div className={styles.wrapper}>
      <h2
        className={`${page === "product" && "xl:!text-24 xl:!tracking-0.48"} ${
          styles.heading
        }`}>
        {str.heading}
      </h2>
      <div className={styles.cards_wrapper} ref={sliderRef}>
        {homePageData?.offerCoupons?.map((item, index) => (
          <div
            key={index.toString()}
            className={styles.card}
            onClick={() => {
              handleCopyClick(item.coupon_code);
              setCopiedIndex(index);
            }}>
            <div className={`${styles.ellipse} ${styles.left}`}></div>
            <div className={`${styles.ellipse} ${styles.right}`}></div>
            <div className="xl:w-full">
              <p
                className={`${styles.desc} !whitespace-normal lg:pr-6 3xl:pr-10 !w-full`}>
                {`${item?.price_text}
                 ${
                   item?.max_discount !== "0"
                     ? `(up to Rs ${item?.max_discount})*`
                     : ""
                 }
                 `}
                {item?.price_below_text && <>{item?.price_below_text}</>}
              </p>
              {/* {item?.price_below_text && (
                <p className={styles.desc}>
                  {item?.price_below_text.split(" ").slice(0, 7).join(" ")}
                </p>
              )} */}
              <p className={styles.code}>Use Code {item?.coupon_code}</p>
            </div>
            <div className={`${styles.line} `}></div>
            <div className={styles.copy_div}>
              {item?.coupon_code && (
                <button id={index} className="text-[#222] flex ">
                  {isCopied && copiedIndex === index ? (
                    "Copied!"
                  ) : (
                    <>
                      <CopyIcon size={20} color={"black"} className={"mr-1"} />
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};
export default OffersAndCoupons;

export const OffersSkeleton = () => {
  return (
    <div className={`${styles.skeleton_wrapper} ${styles.wrapper}`}>
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
};
