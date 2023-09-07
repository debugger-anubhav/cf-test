import React from "react";
import styles from "./style.module.css";
import {Close, Delete, Rupee} from "@/assets/icon";
import {RiSparklingFill} from "react-icons/ri";
import {Box, Modal, Typography} from "@mui/material";
import {getLocalStorage} from "@/constants/constant";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";

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
}) => {
  const [deleteIconClick, setDeleteIconClick] = React.useState(false);
  const data = {
    tempUserId: getLocalStorage("tempUserID") ?? "",
    userId: getLocalStorage("user_id") ?? "",
    // tempUserId: JSON.parse(localStorage.getItem("tempUserID")) ?? "",
    // userId: JSON.parse(localStorage.getItem("user_id")),
    productId: productID,
  };
  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );

  const remove = () => {
    removewhislistProduct()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className={`${styles.wrapper} ${productWidth} `}>
      <div className="relative">
        <img
          src={cardImage}
          alt="thumbnail image"
          className={`${styles.thumbnail} ${isImageHeight && "min-h-[240px]"}
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
        <Delete
          size={25}
          color={"#71717A"}
          onClick={() => {
            setDeleteIconClick(true);
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
      <div>
        <button className={styles.move_to_cart_btn}>Move to Cart</button>
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
            {" "}
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography className={styles.delete_item_text}>
                Delete item?
              </Typography>
              <button
                onClick={() => {
                  setDeleteIconClick(false);
                }}>
                <Close
                  size={25}
                  color={"#222222"}
                  className={"cursor-pointer"}
                />
              </button>
            </Box>
            <Box>
              <Typography className={styles.delete_confirmation_text}>
                Are you sure you want to delete this product from the wishlist?
              </Typography>
            </Box>
            <Box>
              <button className={styles.cancel_delete_btn}>Cancel</button>
              <button
                className={styles.confirm_delete_btn}
                onClick={() => {
                  remove();
                }}>
                Yes, Delete
              </button>
            </Box>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
