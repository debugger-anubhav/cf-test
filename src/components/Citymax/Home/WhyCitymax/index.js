import React, {useState} from "react";
import styles from "./styles.module.css";
import {ForwardArrow, IconLink} from "@/assets/icon";
import CityMaxDrawer from "@/components/Home/TryCityMax/cityMaxDrawer";

const WhyCitymax = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cardData = [
    {
      icon: "free-swap-icon.svg",
      head: "Free Swap",
      desc: "Swap any product or design anytime during the subscription period",
    },
    {
      icon: "cancel-anytime-icon.svg",
      head: "Cancel anytime",
      desc: "Swap any product or design anytime during the subscription period",
    },
    {
      icon: "easy-on-wallet-icon.svg",
      head: "Easy on Wallet",
      desc: "Swap any product or design anytime during the subscription period",
    },
    {
      icon: "quality-products-icon.svg",
      head: "Quality Products",
      desc: "Swap any product or design anytime during the subscription period",
    },
    {
      icon: "comprehensive-furnishing-icon.svg",
      head: "Comprehensive Furnishing",
      desc: "Swap any product or design anytime during the subscription period",
    },
    {
      icon: "free-delivery-installation-and-maintenance-icon.svg",
      head: "Free Delivery, Installation & Maintenance",
      desc: "Swap any product or design anytime during the subscription period",
    },
  ];

  const HandleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.main}>
      <p className={styles.head}>Why CityMax?</p>
      <div className={styles.card_wrapper}>
        {cardData?.map((item, index) => (
          <div key={index.toString()} className={styles.card}>
            <img src={`${IconLink + item.icon}`} className={styles.icon} />
            <p className={styles.card_head}>{item.head}</p>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>

      <button
        className={styles.how_it_works_button}
        onClick={HandleToggleDrawer}>
        <p className={styles.how_it_works_paragraph}>How it works</p>
        <ForwardArrow
          size={18}
          color={"#597492"}
          className={styles.forward_arrow}
        />
      </button>
      {isDrawerOpen && (
        <CityMaxDrawer toggleDrawer={HandleToggleDrawer} open={isDrawerOpen} />
      )}
    </div>
  );
};

export default WhyCitymax;
