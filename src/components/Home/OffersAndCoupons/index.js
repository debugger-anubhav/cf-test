import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {CopyIcon} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@/hooks/useQuery";
import {offersAndCuponsList} from "@/store/Slices";

const OffersAndCoupons = () => {
  const dispatch = useDispatch();
  const homePageData = useSelector(state => state.homePagedata);
  const cityId = homePageData.cityId;

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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{str.heading}</h2>
      <div className={styles.cards_wrapper}>
        {homePageData?.offerCoupons?.map((item, index) => (
          // {/* {str.card_data.map((item, index) => ( */}
          <div key={index} className={styles.card}>
            <div className={`${styles.ellipse} ${styles.left}`}></div>
            <div className={`${styles.ellipse} ${styles.right}`}></div>
            <div className="xl:w-full">
              <p className={styles.desc}>{`${item?.price_text} ${
                item?.max_discount !== "0"
                  ? `(up to Rs ${item?.max_discount})*`
                  : ""
              } `}</p>
              <p className={styles.desc}>{item?.price_below_text}</p>
              <p className={styles.code}>Use Code {item?.coupon_code}</p>
            </div>
            <div className={styles.line}></div>
            <div className={styles.copy_div}>
              <CopyIcon size={20} color={"black"} />
              <p className="text-[#222]">Copy</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OffersAndCoupons;
