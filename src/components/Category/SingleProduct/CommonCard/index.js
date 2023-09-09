import React, {useEffect} from "react";
import styles from "./style.module.css";
import {Heart} from "@/assets/icon";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "@/constants/constant";
import {addRemoveWhishListitems} from "@/store/Slices/categorySlice";
import {RiSparklingFill} from "react-icons/ri";

const CategoryCard = ({
  hoverCardImage,
  cardImage,
  desc,
  currentPrice,
  originalPrice,
  discount,
  productID,
  soldOut,
}) => {
  const [hoverCard, setHoverCard] = React.useState(false);
  const [inWishList, setInWishList] = React.useState(false);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const dispatch = useDispatch();

  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
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
      className={`${styles.card_wrapper} `}
      onMouseOver={() => {
        setHoverCard(true);
      }}
      onMouseOut={() => setHoverCard(false)}>
      <div className="relative">
        <img
          src={hoverCard ? hoverCardImage : cardImage}
          alt="thumbnail image"
          className={styles.img}
        />
        {soldOut && (
          <div className={styles.soldout_tag}>
            <RiSparklingFill size={16} color={"#ffffff"} />
            <p className={styles.tag_text}>SOLD OUT</p>
          </div>
        )}
      </div>

      {/* {soldOut && (
        <div className={styles.soldout_tag}>
          <p className={styles.tag_text}>SOLD OUT</p>
        </div>
      )} */}

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
            <span className={styles.rupeeIcon}>₹</span>
            {`${currentPrice} /mo`}
          </h3>

          {currentPrice < originalPrice && (
            <h3 className={`${styles.originalPrice} flex`}>
              <span className={styles.rupeeIcon}>₹</span>
              {`${originalPrice} /mo`}
            </h3>
          )}
        </div>
        {/* {originalPrice !== currentPrice && ( */}
        {currentPrice < originalPrice && (
          <div className={styles.discount}>{`-${discount} OFF`}</div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
