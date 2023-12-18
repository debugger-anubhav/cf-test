import React from "react";
import styles from "./styles.module.css";
import {IconLink} from "@/assets/icon";
import {useRouter} from "next/navigation";
const CommonCard = ({isHalfYearly, item, plans}) => {
  const router = useRouter();

  // const productNameArray = item.product_name.split(" ");
  // productNameArray.pop();
  // const modifiedProductName = productNameArray.join("");

  return (
    <div
      className={styles.card}
      onClick={() =>
        router.push(`/choose-products/${item.id}/${isHalfYearly ? 6 : 12}`)
      }>
      <p className={styles.card_head}>{item.product_name}</p>
      <p className={styles.card_desc}>{item.description}</p>
      <p className={styles.card_offer}>
        {plans.slots[item.id].length} products @ just
      </p>
      <p className={styles.card_price}>
        <span className={styles.rupeeIcon}>₹</span>
        {item.sale_price}/mo
      </p>
      <button className={styles.btn}>Select plan</button>
      {item.tag && (
        <div className={styles.tag}>
          <img
            src={`${IconLink + "popular-icon.svg"}`}
            className={styles.leaf_icon}
            loading="lazy"
            alt="LeafIcon"
          />
          {item.tag}
        </div>
      )}
    </div>
  );
};

export default CommonCard;
