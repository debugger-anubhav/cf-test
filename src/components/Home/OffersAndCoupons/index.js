import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {CopyIcon} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";
import {offersAndCuponsList} from "@/store/Slices";
import {useHorizontalScroll} from "@/hooks/useHorizontalScroll";
import {Skeleton} from "@mui/material";

const OffersAndCoupons = () => {
  const dispatch = useDispatch();
  const homePageData = useSelector(state => state.homePagedata);
  const cityId = homePageData.cityId;
  const [isCopied, setIsCopied] = React.useState(false);
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
      .catch(err => console.log(err));
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

  const scrollRef = useHorizontalScroll();
  const tabBox =
    typeof document !== "undefined" ? document.querySelector("#slider") : null;
  let isDragging = false;

  const dragging = e => {
    if (!isDragging) return;
    if (tabBox) tabBox.scrollLeft -= e.movementX;
  };
  const dragStop = () => {
    isDragging = false;
  };

  // if (tabBox) {
  tabBox?.addEventListener("mousedown", () => (isDragging = true));
  tabBox?.addEventListener("mousemove", dragging);
  // }

  useEffect(() => {
    document.addEventListener("mouseup", dragStop);
  }, []);

  return homePageData?.offerCoupons ? (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{str.heading}</h2>
      <div className={styles.cards_wrapper} ref={scrollRef} id="slider">
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
              <p className={styles.desc}>{`${item?.price_text} ${
                item?.max_discount !== "0"
                  ? `(up to Rs ${item?.max_discount})*`
                  : ""
              } `}</p>
              {item?.price_below_text && (
                <p className={styles.desc}>
                  {item?.price_below_text.split(" ").slice(0, 7).join(" ")}
                </p>
              )}
              <p className={styles.code}>Use Code {item?.coupon_code}</p>
            </div>
            <div className={styles.line}></div>
            <div className={styles.copy_div}>
              <button id="copy-button" className="text-[#222] flex ">
                {isCopied && copiedIndex === index ? (
                  "Copied!"
                ) : (
                  <>
                    <CopyIcon size={20} color={"black"} className={"mr-1"} />
                    Copy
                  </>
                )}
              </button>
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
    <div className={`flex flex-col my-8 ${styles.wrapper}`}>
      <Skeleton variant="text" className={styles.Skeleton_text} />
      <div className={styles.offer_card_skeleton}>
        {[1, 2, 3, 4]?.map((item, index) => (
          <>
            <Skeleton
              variant="rectangular"
              className={styles.offer_coupon_skeleton}
              key={index.toString()}
            />
          </>
        ))}
      </div>
    </div>
  );
};
