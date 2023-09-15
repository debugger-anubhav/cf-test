import React, {useEffect, useState, useRef} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage, getLocalStorageString} from "@/constants/constant";
import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
import {useRouter} from "next/navigation";
import {useQuery} from "@/hooks/useQuery";

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
  const [inWishList, setInWishList] = useState(isSavedComp || false);
  const [hoverCard, setHoverCard] = useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const updateCount = useRef(0);

  const dispatch = useDispatch();
  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
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
      getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
    }`,
  );
  const userId = getLocalStorageString("user_id");
  // useEffect(() => {
  //   const payload = {
  //     tempUserId: getLocalStorage("tempUserID") ?? "",
  //     userId: getLocalStorage("user_id") ?? "",
  //     productId: productID,
  //   };
  //   if (updateCount.current > 1) {
  //     console.log(inWishList, "inWishList");
  //     if (inWishList === false || categoryPageReduxData.addRemoveWhislitItem === false) {
  //       getwhislistProduct(payload)
  //         .then(res => console.log(res?.data?.data))
  //         .catch(err => console.log(err));
  //     } else if (inWishList === true || categoryPageReduxData.addRemoveWhislitItem === true) {
  //       removewhislistProduct(payload)
  //         .then(res => console.log(res))
  //         .catch(err => console.log(err));
  //     }
  //   }
  // }, [productID, inWishList, categoryPageReduxData.addRemoveWhislitItem]);

  const handleWhislistCard = e => {
    e.stopPropagation();
    if (!userId) {
      router.push("https://test.rentofurniture.com/user_sign_up");
      return;
    }
    // dispatch(addRemoveWhishListitems(!inWishList));
    !inWishList
      ? addwhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
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
            console.log(res?.data?.dat);
          })
          .catch(err => console.log(err))
      : removewhislistProduct()
          .then(res => {
            getSavedItems()
              .then(res => {
                dispatch(addSaveditems(res?.data?.data));
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
            console.log(res);
          })
          .catch(err => console.log(err));
  };

  // const handleWhislistCard = e => {
  //   e.stopPropagation();
  //   if (updateCount.current <= 1) updateCount.current += 1;
  //   setInWishList(!inWishList);
  //   dispatch(addRemoveWhishListitems(!inWishList));
  // };

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
    <a
      href={`/things/${productID}/${seourl}`}
      onClick={e => {
        e.preventDefault();
      }}>
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
            alt="thumbnail image"
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
              // onClick={e => {
              //   e.preventDefault();
              //   setInWishList(!inWishList);
              // }}
              // onClick={e => {
              //   e.preventDefault();
              //   handleWhislistCard(e);
              // }}
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
  );
};

export default Card;
