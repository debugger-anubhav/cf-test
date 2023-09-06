import React from "react";
import styles from "./style.module.css";
import {Close, Delete, Rupee} from "@/assets/icon";
import {RiSparklingFill} from "react-icons/ri";
import {Box, Modal, Typography} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  width: 400,
  boxShadow: 24,
  p: 4,
};

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
}) => {
  const [deleteIconClick, setDeleteIconClick] = React.useState(false);

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
          onClick={e => {
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
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography className={styles.delete_item_text}>
              Delete item?
            </Typography>
            <Close
              size={25}
              color={"#222222"}
              onClick={e => {
                setDeleteIconClick(false);
              }}
              className={"cursor-pointer"}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCard;
