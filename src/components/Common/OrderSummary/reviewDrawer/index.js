import React, {useState} from "react";
import styles from "./styles.module.css";
import commonStyles from "../styles.module.css";
import {Close, ForwardArrow, RatingStar} from "@/assets/icon";
import {Drawer} from "@mui/material";
import Rating from "react-rating";
import {getLocalStorage, productPageImagesBaseUrl} from "@/constants/constant";
import {showToastNotification} from "../../Notifications/toastUtils";
import {decrypt} from "@/hooks/cryptoUtils";
import {baseInstance} from "@/network/axios";

const ReviewDrawer = ({
  toggleDrawer,
  open,
  productImage,
  productName,
  item,
}) => {
  const userId = decrypt(getLocalStorage("_ga"));

  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [rating, setRating] = useState(0);
  const [showError, setshowError] = useState(false);
  const [reviewDesc, setReviewDesc] = useState("");

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };
  const writeReview = () => {
    const headers = {
      user_id: userId,
      product_id: item?.product_id,
      city_id: 46,
      rating,
      review_description: reviewDesc,
    };
    baseInstance
      .post("fc-payments/saveProductReview", headers)
      .then(res => {
        if (res?.data?.status_code === 200) {
          showToastNotification("Your review has been saved successfully", 1);
        }
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <div>
      {" "}
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        classes={{paper: styles.customDrawer}}>
        <div className={styles.main_container}>
          <div
            className={styles.close_icon}
            onClick={() => {
              toggleDrawer();
            }}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>

          <p className={styles.head}>Write review</p>
          <div className={styles.wrapper}>
            <div className={commonStyles.img_wrapper}>
              <img
                className="w-full h-full"
                src={`${productPageImagesBaseUrl + "thumb/" + productImage}`}
                loading="lazy"
                alt={productName}
              />
            </div>
            <div>
              <p className={commonStyles.prod_name}>{productName}</p>
              <div className={styles.rating_row}>
                <Rating
                  emptySymbol={
                    <RatingStar color={"#CACACC"} className={styles.star} />
                  }
                  fullSymbol={
                    rating > 0 ? (
                      <RatingStar color={"#F6B704"} className={styles.star} />
                    ) : isHovered ? (
                      <RatingStar color={"#EAD18A"} className={styles.star} />
                    ) : (
                      <RatingStar color={"#F6B704"} className={styles.star} />
                    )
                  }
                  onClick={ratingValue => {
                    setRating(ratingValue);
                    setIsHovered(false);
                  }}
                  onHover={() => {
                    setIsHovered(true);
                  }}
                  initialRating={rating}
                  name="ratingnumber"
                />
              </div>
              {showError && (
                <p className={styles.err}>
                  Please rate the product out of 5 stars
                </p>
              )}
            </div>
          </div>

          <div>
            <textarea
              className={styles.input_area}
              placeholder="Let us know what did you think of the product"
              onChange={e => setReviewDesc(e.target.value)}
            />
          </div>
          <div className={styles.btn_wrapper}>
            <div
              className={styles.btn}
              onClick={() => {
                if (rating > 0) {
                  setshowError(false);
                  toggleDrawer();
                  writeReview();
                } else setshowError(true);
              }}>
              Submit
              <ForwardArrow className={styles.arrow} />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ReviewDrawer;
