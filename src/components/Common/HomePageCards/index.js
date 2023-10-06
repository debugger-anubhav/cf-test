import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "../Notifications/toastUtils";

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
  isSmallScreen,
}) => {
  const [inWishList, setInWishList] = useState(isSavedComp || false);
  const [hoverCard, setHoverCard] = useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const updateCount = useRef(0);

  const dispatch = useDispatch();
  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    // userId: getLocalStorage("user_id") ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId: productID,
  };
  const router = useRouter();
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
    `?cityId=${cityId}&userId=${
      // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
      decrypt(getLocalStorage("_ga")) ??
      decryptBase64(getLocalStorage("tempUserID"))
    }`,
  );
  const userId = decrypt(getLocalStorage("_ga"));
  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
                // console.log("hdhwiujw");
                showToastNotification("Item added to the wishlist", 1);
                const ids = res?.data?.data.map(item => {
                  return item?.id;
                });
                dispatch(addSaveditemID(ids));
              })
              .catch(err => console.log(err));

            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err))
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
              .catch(err => console.log(err));
            if (!isSavedComp) {
              setInWishList(prev => !prev);
            }
          })
          .catch(err => console.log(err));
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
    updateCount.current += 1;
  }, []);

  const handleProductClick = (e, productID, seourl) => {
    e.stopPropagation();
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${productID}/${seourl}`);
    }
  };

  return (
    <>
      <a
        href={`/things/${productID}/${seourl}`}
        onClick={e => e.preventDefault()}
        className={styles.anchor_card}
        aria-label={desc.replace(/-/g, " ")}
        target="_self"
        rel="noopener">
        <div
          onClick={e => handleProductClick(e, productID, seourl)}
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
              {desc.replace(/-/g, " ")}
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
      </a>
    </>
  );
};

export default Card;
