import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
// import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "../Notifications/toastUtils";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {reduxSetModalState, setLoginPopupState} from "@/store/Slices";
import LoginModal from "@/components/LoginPopups";
import {useRouter} from "next/navigation";

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
}) => {
  const router = useRouter();
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

  const words = desc.replace(/-/g, " ").split(" ");

  const xlTrimmedString =
    words.length > 8
      ? words.slice(0, 8).join(" ") + "..."
      : desc.replace(/-/g, " ");
  useEffect(() => {
    dispatch(reduxSetModalState(loginModal));
    dispatch(setLoginPopupState(loginModal));
  }, [loginModal]);

  const toggleLoginModal = bool => {
    setLoginModal(bool);
  };

  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    // userId: getLocalStorage("user_id") ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId: productID,
  };
  // const router = useRouter();
  const cityIdStr = localStorage
    .getItem("cityId")
    ?.toString()
    ?.replace(/"/g, "");
  const cityId = parseFloat(cityIdStr);

  const {mutateAsync: addwhislistProduct} = useMutation(
    "add-wishlist",
    "POST",
    endPoints.addWishListProduct,
    data,
  );

  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );

  const {refetch: getSavedItems} = useQuery(
    "saved-items",
    endPoints.savedItems,
    `?cityId=${cityId}&userId=${decrypt(getLocalStorage("_ga"))}`,
  );

  const addToWishlist = () => {
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                showToastNotification("Item added to the wishlist", 1);
                window?.fbq("track", "AddToWishlist");
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err?.message || "some error"));

            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err?.message || "some error"))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                showToastNotification("Item removed from the wishlist", 2);
                // addSaveditemID
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err?.message || "some error"));
            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err?.message || "some error"));
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

  // const handleProductClick = (e, productID, seourl) => {
  //   e.stopPropagation();
  //   if (!e.target.classList.contains(styles.child)) {
  //     router.push(`/things/${productID}/${seourl}`);
  //   }
  // };

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
      {/* <a
        href={!reduxStateOfLoginPopup && `/things/${productID}/${seourl}`}
        className={styles.anchor_card}
        onClick={() => {
          if (!reduxStateOfLoginPopup) {
            router.push(`/things/${productID}/${seourl}`);
            window.scrollTo({top: 0});
          }
        }}
        aria-label={desc.replace(/-/g, " ")}
        target="_self"
        rel="noopener"> */}
      <div
        // onClick={e => {
        //   !reduxStateOfLoginPopup && handleProductClick(e, productID, seourl);
        // }}
        onClick={() => {
          if (!reduxStateOfLoginPopup) {
            router.push(`/things/${productID}/${seourl}`);
            window.scrollTo({top: 0});
          }
        }}
        className={`${styles.wrapper} ${hoverCard && styles.hover_wrapper} ${
          productWidth ?? ""
        } 
      `}
        onMouseOver={() => {
          isHover && setHoverCard(true);
        }}
        onMouseOut={() => {
          setHoverCard(false);
        }}>
        <div className="relative">
          <img
            src={hoverCard ? hoverCardImage : cardImage}
            alt={desc}
            loading="lazy"
            width={"100%"}
            height={"100%"}
            className={`${styles.thumbnail}
          ${hoverCard && styles.card_image_hover} 
          }
          `}
          />

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
      {/* </a> */}
    </>
  );
};

export default Card;
