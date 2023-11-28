import React from "react";
import styles from "./style.module.css";
import {BackIcon, ForwardArrow, ForwardArrowWithLine} from "@/assets/icon";
import {IoIosSwap} from "react-icons/io";

function SwapProduct() {
  const ProductInfo = [
    {icon: "icon", title: "Jane Queen Size Bed"},
    {icon: "icon", title: "Jane Queen Size Bed"},
    {
      icon: "icon",
      title: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
  ];
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.main_heading}>
        <BackIcon />
        Swap product
      </div>
      <div className={styles.buy_info}>
        <p className={styles.desc}>Select products to swap</p>

        <div>
          {ProductInfo?.map((item, index) => (
            <div
              key={index.toString()}
              className={` ${
                index !== ProductInfo.length - 1
                  ? " border-b border-EDEDEE"
                  : "border-0"
              } ${styles.request_info_div}`}>
              <div className="flex gap-2 items-center">
                <img
                  className={styles.product_imge_thambnil}
                  src=""
                  alt="icon"
                />
                <p className={styles.request_type}>{item.title}</p>
              </div>
              <div className="flex">
                <ForwardArrow />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.bottom_row}>
          <button className={styles.proceed_btn}>
            Create request <ForwardArrowWithLine />
          </button>
        </div>
      </div>

      <div className={styles.selected_product_info_wrapper}>
        <div className="flex flex-col">
          <p className={styles.desc}>Selected product:</p>
          <p className={`${styles.desc} !text-222`}>Jane Queen Size Bed</p>
        </div>
        <div className={styles.swap_info}>
          <img className={styles.product_imge_thambnil} />
          <IoIosSwap color="#9A9AA2" size={22} />
        </div>
      </div>
      <div>
        <p className={styles.swap_heading}>Select product to swap to</p>
      </div>
    </div>
  );
}

export default SwapProduct;
