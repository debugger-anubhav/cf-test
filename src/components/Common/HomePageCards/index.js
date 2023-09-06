import React, {useEffect} from "react";
import styles from "./style.module.css";
import {Heart, Rupee} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addRemoveWhishListitems} from "@/store/Slices/categorySlice";

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
  isImageHeight = false,
  productID,
}) => {
  const [inWishList, setInWishList] = React.useState(false);
  const [hoverCard, setHoverCard] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const dispatch = useDispatch();

  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    // userId: JSON.parse(localStorage.getItem("user_id")),
    productId: productID,
  };

  const {mutateAsync: getwhislistProduct} = useMutation(
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

  const handleWhislistCard = e => {
    e.stopPropagation();
    setInWishList(!inWishList);
    dispatch(addRemoveWhishListitems(!inWishList));
    !inWishList
      ? getwhislistProduct()
          .then(res => console.log(res?.data?.dat))
          .catch(err => console.log(err))
      : removewhislistProduct()
          .then(res => console.log(res))
          .catch(err => console.log(err));
  };

  useEffect(() => {
    setInWishList(
      categoryPageReduxData.savedProducts
        .map(obj => obj.id)
        .includes(productID),
    );
  }, []);

  return (
    <div
      // onClick={() => handleProductClick(productId)}
      className={`${styles.wrapper} ${
        hoverCard && styles.hover_wrapper
      } ${productWidth} 
      `}
      onMouseOver={() => {
        isHover && setHoverCard(true);
      }}
      onMouseOut={() => setHoverCard(false)}>
      <div className="relative">
        <img
          src={hoverCard ? hoverCardImage : cardImage}
          alt="thumbnail image"
          className={`${styles.thumbnail}
          ${hoverCard && styles.card_image_hover} ${
            isImageHeight && "min-h-[240px]"
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
          {desc}
        </h3>
        <Heart
          size={25}
          color={inWishList ? "#D96060" : "#C0C0C6"}
          // onClick={e => {
          //   e.preventDefault();
          //   setInWishList(!inWishList);
          // }}
          onClick={e => {
            e.preventDefault();
            handleWhislistCard(e);
          }}
          className={"cursor-pointer"}
        />
      </div>
      <div className={styles.price_div}>
        <div className={styles.card_price_wrap}>
          <h3 className={`${styles.currentPrice} flex`}>
            <Rupee />
            {`${currentPrice} /mo`}
          </h3>
          <h3 className={`${styles.originalPrice} flex`}>
            <Rupee />
            {`${originalPrice} /mo`}
          </h3>
        </div>
        {/* {originalPrice !== currentPrice && ( */}
        {currentPrice < originalPrice && (
          <div className={styles.discount}>{discount}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
