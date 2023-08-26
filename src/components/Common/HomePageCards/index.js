import React from "react";
import styles from "./style.module.css";
import {Heart, Rupee} from "@/assets/icon";

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
}) => {
  const [inWishList, setInWishList] = React.useState(false);
  const [hoverCard, setHoverCard] = React.useState(false);

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
          ${hoverCard && styles.card_image_hover}
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
          onClick={e => {
            e.preventDefault();
            setInWishList(!inWishList);
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
        {originalPrice !== currentPrice && (
          <div className={styles.discount}>{discount}</div>
        )}
      </div>
    </div>
  );
};

export default Card;
