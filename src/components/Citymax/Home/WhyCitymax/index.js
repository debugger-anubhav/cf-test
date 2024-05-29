import React, {useState} from "react";
import styles from "./styles.module.css";
import {ForwardArrow, IconLink} from "@/assets/icon";
import CityMaxDrawer from "@/components/Home/TryCityMax/cityMaxDrawer";

const WhyCitymax = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cardData = [
    {
      icon: "comprehensive-furnishing-icon.svg",
      head: "Comprehensive Furnishing",
      desc: "A single plan for your furniture & appliances requirements",
    },
    {
      icon: "quality-products-icon.svg",
      head: "Quality Products",
      desc: "Branded appliances and solid Sheesham Wood products in mint new condition",
    },
    {
      icon: "easy-on-wallet-icon.svg",
      head: "Easy on Wallet",
      desc: "You can pay subscription fee in one go or opt for our no cost EMI plan",
    },
    {
      icon: "free-delivery-installation-and-maintenance-icon.svg",
      head: "Free Delivery, Installation & Maintenance",
      desc: "There is no delivery fee & our experts will install the products in a jiffy for you",
    },
    {
      icon: "cancel-anytime-icon.svg",
      head: "Free relocation",
      desc: "Planning to relocate? We’ll help you relocate your furniture for free",
    },
    {
      icon: "free-swap-icon.svg",
      head: "Free Swap",
      desc: "Swap any product or design anytime during the subscription period",
    },
  ];

  const HandleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className={styles.main}>
      <CityMaxDrawer toggleDrawer={HandleToggleDrawer} open={isDrawerOpen} />
      <h2 className={styles.head}>Why CityMax?</h2>
      <div className={styles.card_wrapper}>
        {cardData.map((item, index) => (
          <div key={index} className={styles.card}>
            <img
              src={`${IconLink + item.icon}`}
              className={styles.icon}
              alt="icon"
              loading="lazy"
            />
            <h3 className={styles.card_head}>{item.head}</h3>
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
    </div>
  );
};

export default WhyCitymax;
