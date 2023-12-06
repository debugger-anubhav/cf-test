import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close} from "@/assets/icon";
import styles from "./styles.module.css";
import Image from "next/image";
import logo from "../logo.jpg";
import {useRouter} from "next/navigation";
import {IconLink} from "../../../../assets/icon";

const MenuDrawer = ({toggleDrawer, open}) => {
  const router = useRouter();

  const arr1 = [
    {
      label: "CityMax Ultra",
      link: "",
    },
    {
      label: "CityMax Pro",
      link: "",
    },
    {
      label: "CityMax Lite",
      link: "",
    },
    {
      label: "CityMax Mini",
      link: "",
    },
    {
      label: "CityMax Appliances",
      link: "",
    },
  ];
  const arr2 = [
    {
      label: "Furniture Sale",
      link: "",
    },
    {
      label: "CF For Businesses",
      link: "",
    },
    {
      label: "Pay your dues",
      link: "",
    },
  ];
  const arr3 = [
    {
      label: "How It Works?",
      link: "",
    },
    {
      label: "FAQs",
      link: "",
    },
    {
      label: "Contact us",
      link: "",
    },
  ];
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      <div className={`${styles.drawer_wrapper} `}>
        <div onClick={toggleDrawer} className={styles.close_icon}>
          <Close color={"#45454A"} size={20} />
        </div>
        <Image className={styles.logo} src={logo} />
        <div className={styles.content_wrapper}>
          <div className={styles.map_wrapper}>
            {arr1.map((item, index) => (
              <div
                key={index}
                onClick={() => console.log(item.link)}
                className={styles.map_item}>
                {item.label}
              </div>
            ))}
          </div>

          <div className={styles.line}></div>

          <div className={styles.map_wrapper}>
            {arr2.map((item, index) => (
              <div
                key={index}
                onClick={() => console.log(item.link)}
                className={styles.map_item}>
                {item.label}
              </div>
            ))}
          </div>

          <div className={styles.line}></div>

          <div className={styles.map_wrapper}>
            {arr3.map((item, index) => (
              <div
                key={index}
                onClick={() => console.log(item.link)}
                className={styles.map_item}>
                {item.label}
              </div>
            ))}
          </div>

          <div className={styles.line}></div>

          <div>
            <p className={styles.map_item}>Profile</p>
          </div>

          <div className={styles.button} onClick={() => router.push("/")}>
            <p className={styles.back_txt}>Back to Cityfurnish</p>
            <img
              src={`${IconLink + "home-cityfurnish.svg"}`}
              className={styles.home_icon}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
