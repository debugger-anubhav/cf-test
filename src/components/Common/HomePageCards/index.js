import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Heart} from "@/assets/icon";

const Card = ({
  desc,
  currentPrice,
  originalPrice,
  discount,
  showincludedItem,
  cardImage,
  hoverCardImage,
  // hoverCard,
  itemIncluded,
}) => {
  const [inWishList, setInWishList] = React.useState(false);
  const [hoverCard, setHoverCard] = React.useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseOver={() => setHoverCard(true)}
      onMouseOut={() => setHoverCard(false)}>
      <div className="relative">
        <Image
          src={hoverCard ? hoverCardImage : cardImage}
          alt="thumbnail image"
          className={styles.thumbnail}
          width={241}
          height={181}
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
      </div>
      <div className={styles.desc_div}>
        <h3 className={styles.desc} style={{lineHeight: "normal"}}>
          {desc}
        </h3>
        <Heart
          size={25}
          color={inWishList ? "#D96060" : "#C0C0C6"}
          onClick={() => setInWishList(!inWishList)}
          className={"cursor-pointer"}
        />
      </div>
      <div className={styles.price_div}>
        <div className="flex gap-[0.62rem] items-center">
          <h3 className={styles.currentPrice}>{`₹${currentPrice} /mo`}</h3>
          <h3 className={styles.originalPrice}>{`₹${originalPrice} /mo`}</h3>
        </div>
        <div className={styles.discount}>{discount}</div>
      </div>
    </div>
  );
};

export default Card;
