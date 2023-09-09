import React, {useState} from "react";
import styles from "./style.module.css";
import {Close, DeleteIcon, Rupee} from "@/assets/icon";
import {RiSparklingFill} from "react-icons/ri";
import {Box, Modal, Typography} from "@mui/material";
import {getLocalStorage} from "@/constants/constant";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useRouter} from "next/navigation";

const ProductCard = ({
  desc,
  currentPrice,
  originalPrice,
  discount,
  showincludedItem,
  cardImage,
  itemIncluded,
  soldOut,
  productWidth,
  isImageHeight = false,
  productID,
  refreshFunction,
  hoverCardImage,
}) => {
  const [deleteIconClick, setDeleteIconClick] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoverCard, setHoverCard] = useState(false);

  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    // userId: JSON.parse(localStorage.getItem("user_id")),
    productId: productID,
  };
  const router = useRouter();
  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );

  const remove = () => {
    removewhislistProduct()
      .then(res => {
        setDeleteIconClick(false);

        refreshFunction(Math.random());
      })
      .catch(err => console.log(err));
  };

  return (
    <div
      className={`${styles.wrapper} ${productWidth} `}
      onMouseOver={() => {
        setHoverCard(true);
      }}
      onMouseOut={() => setHoverCard(false)}>
      <div className="relative">
        <img
          src={hoverCard ? hoverCardImage : cardImage}
          alt="thumbnail image"
          className={`${styles.thumbnail} ${isImageHeight && "min-h-[240px]"}
          `}
        />
        {showincludedItem && (
          <div className={styles.item_included_container}>
            <p
              className={
                styles.item_icluded_text
              }>{`${itemIncluded} items included`}</p>
          </div>
        )}
        {!soldOut && (
          <div className={styles.soldout_tag}>
            <RiSparklingFill size={16} color={"#ffffff"} />
            <p className={styles.tag_text}>SOLD OUT</p>
          </div>
        )}
      </div>
      <div className={styles.desc_div}>
        <h3 className={styles.desc} style={{lineHeight: "normal"}}>
          {desc}
        </h3>
        <span
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
          onClick={() => {
            console.log("first");
            setDeleteIconClick(true);
          }}>
          <DeleteIcon
            size={25}
            color={isHovered ? "#D96060" : "#71717A"}
            className={"cursor-pointer"}
          />
        </span>
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
          <div className={styles.discount}>{`-${discount} OFF`}</div>
        )}
      </div>
      <div>
        <button
          className={styles.move_to_cart_btn}
          onClick={() => router.push("https://cityfurnish.com/cart")}>
          Move to Cart
        </button>
      </div>

      <Modal
        open={deleteIconClick}
        onClose={() => setDeleteIconClick(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableRestoreFocus
        disableEnforceFocus
        disableAutoFocus>
        <div className={styles.main_container}>
          <div>
            <Box display={"flex"} justifyContent={"space-between"}>
              <div>
                <Typography className={styles.delete_item_text}>
                  Delete item?
                </Typography>
                <Box>
                  <Typography className={styles.delete_confirmation_text}>
                    Are you sure you want to delete this product <br /> from the
                    wishlist?
                  </Typography>
                </Box>
                <Box>
                  <button
                    className={styles.cancel_delete_btn}
                    onClick={() => setDeleteIconClick(false)}>
                    Cancel
                  </button>
                  <button
                    className={styles.confirm_delete_btn}
                    onClick={() => {
                      remove();
                    }}>
                    Yes, Delete
                  </button>
                </Box>
              </div>
              <button
                className={`${styles.close_icon_btn}`}
                onClick={() => {
                  setDeleteIconClick(false);
                }}>
                <div className={`${styles.close_icon}`}>
                  <Close size={25} color={"#222222"} />
                </div>
              </button>
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
