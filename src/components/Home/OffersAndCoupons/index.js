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
  const [isCopied, setIsCopied] = React.useState(false);
  const textToCopy = "dneh21jh423rmq";

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

  const handleCopyClick = () => {
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

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>{str.heading}</h2>
      <div className={styles.cards_wrapper} onClick={handleCopyClick}>
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
              <button
                id="copy-button"
                className="text-[#222]"
                onClick={handleCopyClick}>
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OffersAndCoupons;

// import { useState } from 'react';
// import clipboard from 'clipboard';

// const CopyTextButton = ({ textToCopy }) => {
//   const [isCopied, setIsCopied] = useState(false);

//   const handleCopyClick = () => {
//     clipboard.writeText(textToCopy);
//     setIsCopied(true);
//     setTimeout(() => setIsCopied(false), 2000); // Reset "isCopied" after 2 seconds
//   };

//   return (
//     <div>
//       <p>{textToCopy}</p>
//       <button onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy'}</button>
//     </div>
//   );
// };

// export default CopyTextButton;
