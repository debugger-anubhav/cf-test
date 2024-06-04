import React from "react";
import styles from "./style.module.css";
import {categoryIconsUrl} from "@/constants/constant";
import {ArrowForw} from "@/assets/icon";
import {useRouter} from "next/navigation";

const EmptyCartPage = () => {
  const router = useRouter();
  return (
    <div className={styles.main_wrapper}>
      <div className={styles.cart_img_wrapper} onClick={() => router.push("/")}>
        <img
          className={styles.img}
          src={`${categoryIconsUrl + "empty-cart.svg"}`}
          loading="lazy"
          alt="empty-cart"
        />
      </div>
      <div
        className={styles.empty_text_wrapper}
        onClick={() => router.push("/")}>
        <p className={styles.head}>Your cart is empty!</p>

        <p className={styles.desc}>Add items to it now.</p>
        <button className={styles.btn}>
          Start renting <ArrowForw size={19} color={"#222"} />
        </button>
      </div>
    </div>
  );
};

export default EmptyCartPage;
