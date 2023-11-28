import React, {useState} from "react";
import styles from "./style.module.css";
import {
  BackIcon,
  DownArrowUnfilled,
  ForwardArrow,
  ForwardArrowWithLine,
} from "@/assets/icon";
import {IoIosSwap} from "react-icons/io";
import {BsSearch} from "react-icons/bs";

function SwapProduct() {
  const ProductInfo = [
    {icon: "icon", title: "Jane Queen Size Bed"},
    {icon: "icon", title: "Jane Queen Size Bed"},
    {
      icon: "icon",
      title: "Alexa 6 Seater Dining Table with 4 Chairs and Bench",
    },
  ];
  const [searchModalOpen, setsearchModalOpen] = useState(false);
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

      <div className="w-full">
        <p className={styles.swap_heading}>Select product to swap to</p>
        <div className="relative">
          <div className={styles.search_wrapper}>
            <BsSearch />
            <input
              className={styles.search_input}
              type="text"
              placeholder="Search for Furniture, Appliances, etc"
              onClick={() => setsearchModalOpen(true)}
            />
            <DownArrowUnfilled />
          </div>
          {searchModalOpen && (
            <div
              className={`${styles.search_modal} absolute z-10 bg-fff my-2 border border-ECECEC gap-6 flex-col rounded-lg `}>
              {[1, 2, 3, 4]?.map((item, index) => (
                <div
                  className={"flex w-full gap-3 cursor-pointer items-center"}
                  key={index.toString()}
                  onClick={() => setsearchModalOpen(false)}>
                  <img src="" className={styles.product_imge_thambnil} />
                  <p className={styles.desc}>Jade Queen Size Bed</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SwapProduct;
