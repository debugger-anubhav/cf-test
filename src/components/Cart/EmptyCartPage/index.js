import React from "react";
import styles from "./style.module.css";
import {categoryIconsUrl} from "@/constants/constant";
import {ArrowForw} from "@/assets/icon";
import {useRouter} from "next/navigation";

const EmptyCartPage = () => {
  const router = useRouter();
  return (
    <div className={styles.main_wrapper}>
      <div>
        <img
          className={styles.img}
          src={`${categoryIconsUrl + "empty-cart.svg"}`}
          loading="lazy"
          alt="empty-cart"
          onClick={() => router.push("/")}
        />
      </div>
      <p className={styles.head}>Your cart is empty!</p>

      <p className={styles.desc}>Add items to it now.</p>
      <button className={styles.btn} onClick={() => router.push("/")}>
        Start renting <ArrowForw size={19} color={"#222"} />
      </button>
    </div>
  );
};

export default EmptyCartPage;
