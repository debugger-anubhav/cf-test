import React, {useState} from "react";
import style from "./style.module.css";
import {Heart} from "@/assets/icon";

const SubCategoryCard = () => {
  const [inWishList, setInWishList] = useState(false);
  const includedItem = [
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
    {
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png",
    },
  ];
  return (
    <div className={style.main_card_container}>
      <div className={style.product_img_container}>
        <div className={style.image_section}>
          <img
            src={
              "https://d3juy0zp6vqec8.cloudfront.net/images/product/Athena%203%20Seater%20Sofa%201.png"
            }
            className="w-[290px]"
          />
          <span className={style.new_launched}>New Launched</span>
          <span className={style.like}>
            <Heart
              size={15}
              color={inWishList ? "#FF0000" : "#C0C0C6"}
              onClick={() => setInWishList(!inWishList)}
            />
          </span>
        </div>
        <div className={style.description_section}>
          <div className={style.product_descriptiom_wrapper}>
            <h2 className={style.product_title}>Jade King Size Double Bed</h2>
            <div className={style.price_section}>
              <p className={style.original_price}>₹ 999</p>
              <p className={style.current_price}>₹ 988 / month</p>
            </div>
            <div className={style.end_line}></div>
            <div className={style.included_item_container}>
              <h4 className={style.item_included_text}>1 Item Included</h4>
              <div className={style.included_item_listing}>
                {includedItem?.map((item, index) => {
                  return (
                    <div className={style.single_img} key={index.toString()}>
                      <img src={item?.img} className="w-[40px] h-[40px]" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCard;
