import React from "react";
import styles from "./style.module.css";
import {useRouter} from "next/navigation";

const RentNowCard = ({cardImage, url}) => {
  const router = useRouter();

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        router.push(url);
      }}>
      <img
        src={cardImage}
        alt="thumbnail image"
        className={styles?.banner_img}
      />
    </div>
  );
};

export default RentNowCard;
