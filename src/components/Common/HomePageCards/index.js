import React, {useEffect, useState, useRef, memo} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "../Notifications/toastUtils";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {reduxSetModalState, setLoginPopupState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import Link from "next/link";
import Worker from "worker-loader!./homepageCardWorker.js";
import {authToken} from "@/network/axios";
import Image from "@/components/Image";

const Card = ({
  desc,
  currentPrice,
  originalPrice,
  discount,
  showincludedItem,
  cardImage,
  hoverCardImage,
  itemIncluded,
  soldOut,
  isHover = true,
  productWidth,
  productID,
  seourl,
  isSavedComp = false,
  width = 800,
  height = 500,
}) => {
  const {checkAuthentication} = useAuthentication();
  const [inWishList, setInWishList] = useState(isSavedComp || false);
  const [hoverCard, setHoverCard] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const reduxStateOfLoginPopup = useSelector(
    state => state.homePagedata.loginPopupState,
  );
  const updateCount = useRef(0);

  const dispatch = useDispatch();

  const worker = new Worker();

  const words = desc.replace(/-/g, " ").split(" ");

  const xlTrimmedString =
    words.length > 8
      ? words.slice(0, 8).join(" ") + "..."
      : desc.replace(/-/g, " ");

  useEffect(() => {
    dispatch(reduxSetModalState(loginModal));
    dispatch(setLoginPopupState(loginModal));
  }, [loginModal]);

  useEffect(() => {
    return () => {
      worker.terminate();
    };
  }, []);

  const toggleLoginModal = bool => {
    setLoginModal(bool);
  };

  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId: productID,
  };

  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");

  const cityId = parseFloat(cityIdStr);

  const addToWishlist = () => {
    worker.postMessage({
      inWishList,
      productData: data,
      authToken,
      cityId,
      userId: decrypt(getLocalStorage("_ga")),
    });

    worker.onmessage = function ({data}) {
      const {type, wishlistedItems, savedItemIds} = data;
      dispatch(addSaveditems(wishlistedItems));
      dispatch(addSaveditemID(savedItemIds));

      if (!isSavedComp) {
        setInWishList(prev => !prev);
      }
      switch (type) {
        case "addedToWishlist":
          showToastNotification("Item added to the wishlist", 1);
          window?.fbq("track", "AddToWishlist");

          break;

        case "removedFromWishlist":
          showToastNotification("Item removed from the wishlist", 2);
      }
    };
  };

  const handleWhislistCard = async e => {
    e.stopPropagation();
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated === false) {
      toggleLoginModal(true);
    } else addToWishlist();
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
    updateCount.current += 1;
  }, []);

  return (
    <>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        handleChangeRoute={() => {
          console.log("in handlechangerouteee");
          // call this if you want to show the red heart exactly after login
          // addToWishlist();
        }}
      />
      <Link
        href={!reduxStateOfLoginPopup ? `/things/${productID}/${seourl}` : ""}
        className={styles.anchor_card}
        aria-label={desc.replace(/-/g, " ")}
        target="_blank"
        rel="noopener">
        <div
          onClick={() => {
            if (!reduxStateOfLoginPopup) {
              // dispatch(getProductDetails([]));
              window.scrollTo({top: 0});
            }
          }}
          className={`${styles.wrapper} ${
            hoverCard ? styles.hover_wrapper : ""
          } ${productWidth ?? ""} 
      `.trim()}
          onMouseOver={() => {
            isHover && setHoverCard(true);
          }}
          onMouseOut={() => {
            setHoverCard(false);
          }}>
          <div className="relative">
            <Image
              src={hoverCard ? hoverCardImage : cardImage}
              className={`${styles.thumbnail} ${
                hoverCard ? styles.card_image_hover : ""
              }`}
              priority={false}
              loading="lazy"
              alt={desc}
              width={width}
              height={height}
            />
            {/* <img
              src={hoverCard ? hoverCardImage : cardImage}
              alt={desc}
              loading="lazy"
              width={"100%"}
              height={"100%"}
              className={`${styles.thumbnail} ${
                hoverCard ? styles.card_image_hover : ""
              }`.trim()}
            /> */}

            {/* ----------- */}
            {showincludedItem && (
              <div className={styles.item_included_container}>
                <p
                  className={
                    styles.item_icluded_text
                  }>{`${itemIncluded} items included`}</p>
              </div>
            )}
            {soldOut && (
              <div className={styles.soldout_tag}>
                <p className={styles.tag_text}>SOLD OUT</p>
              </div>
            )}
          </div>
          <div className={styles.desc_div}>
            <h3 className={styles.desc} style={{lineHeight: "normal"}}>
              {/* {desc.replace(/-/g, " ")} */}
              {xlTrimmedString}
            </h3>
            <div
              id={productID}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                handleWhislistCard(e);
              }}>
              <Heart
                size={25}
                color={inWishList ? "#D96060" : "#C0C0C6"}
                className={"cursor-pointer"}
              />
            </div>
          </div>
          <div className={styles.price_div}>
            <div className={styles.card_price_wrap}>
              <h3 className={`${styles.currentPrice} flex`}>
                <span className={styles.rupeeIcon}>₹</span>
                {`${currentPrice} /mo`}
              </h3>
              {
                // currentPrice >= originalPrice ? (
                originalPrice > currentPrice ? (
                  <h3 className={`${styles.originalPrice} flex`}>
                    <span className={styles.rupeeIcon}>₹</span>
                    {`${originalPrice} /mo`}
                  </h3>
                ) : null
              }
            </div>

            {/* {originalPrice !== currentPrice && ( */}
            {currentPrice < originalPrice && parseInt(discount) > 0 && (
              <div className={styles.discount}>{`-${discount} OFF`}</div>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default memo(Card);
