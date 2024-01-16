import React, {useState} from "react";
import styles from "./style.module.css";
import {Close, DeleteIcon} from "@/assets/icon";
import {RiSparklingFill} from "react-icons/ri";
import {Box, Modal, Typography} from "@mui/material";
import {getLocalStorage} from "@/constants/constant";
import {useMutation} from "@/hooks/useMutation";
import {endPoints} from "@/network/endPoints";
import {useRouter} from "next/navigation";
import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";
import {showToastNotification} from "@/components/Common/Notifications/toastUtils";

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
  seourl,
}) => {
  const [deleteIconClick, setDeleteIconClick] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const [hoverCard, setHoverCard] = useState(false);

  const data = {
    tempUserId: decryptBase64(getLocalStorage("tempUserID")) ?? "",
    userId: decrypt(getLocalStorage("_ga")) ?? "",
    productId: productID,
  };
  const router = useRouter();
  const cityIdStr = parseInt(getLocalStorage("cityId"));

  const notifyData = {
    userId: Number(decrypt(getLocalStorage("_ga"))),
    cityId: cityIdStr,
    productId: productID,
  };
  const {mutateAsync: removewhislistProduct} = useMutation(
    "remove-wishlist",
    "DELETE",
    endPoints.deleteWishListProduct,
    data,
  );
  const {mutateAsync: notifyAvailibility} = useMutation(
    "notify-availability",
    "POST",
    endPoints.productPage.notifyAvailability,
    notifyData,
  );

  const remove = () => {
    removewhislistProduct()
      .then(res => {
        setDeleteIconClick(false);
        refreshFunction(Math.random());
        showToastNotification("Item deleted from the wishlist", 3);
      })
      .catch(err => console.log(err));
  };
  const handleProductClick = (e, productID, seourl) => {
    if (!e.target.classList.contains(styles.child)) {
      router.push(`/things/${productID}/${seourl}`);
    }
  };
  return (
    <>
      <div
        className={`${styles.wrapper} ${productWidth} `}
        onMouseOver={() => {
          setHoverCard(true);
        }}
        onMouseOut={() => setHoverCard(false)}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          handleProductClick(e, productID, seourl);
        }}>
        <a
          href={`/things/${productID}/${seourl}`}
          onClick={e => {
            e.preventDefault();
          }}>
          <div className="relative">
            <img
              src={hoverCard ? hoverCardImage : cardImage}
              alt={desc?.replace(/-/g, " ")}
              loading="lazy"
              className={`${styles.thumbnail} ${
                isImageHeight && "min-h-[272px]"
              }
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
              {desc?.replace(/-/g, " ")}
            </h3>
            <span
              onMouseOver={() => setIsHovered(true)}
              onMouseOut={() => setIsHovered(false)}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
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
              <div className={styles.discount}>-{discount} OFF</div>
            )}
          </div>
          <div>
            <button
              className={styles.move_to_cart_btn}
              onClick={async e => {
                if (!soldOut) {
                  e.preventDefault();
                  e.stopPropagation();
                  await notifyAvailibility();
                  showToastNotification(
                    "You will be notified once item is in stock",
                    2,
                  );
                }
              }}>
              {!soldOut ? "Notify Me" : "  Move to product page"}
            </button>
          </div>
        </a>
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
                <Box display={"flex"} justifyContent={"space-between"}>
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
    </>
  );
};

export default ProductCard;
