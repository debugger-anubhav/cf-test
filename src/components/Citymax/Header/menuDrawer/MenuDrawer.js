import React, {useEffect, useState} from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close} from "@/assets/icon";
import styles from "./styles.module.css";
import {useRouter} from "next/navigation";
import {IconLink} from "../../../../assets/icon";
import string from "@/constants/Constant.json";
import {getLocalStorage} from "@/constants/constant";
import {decrypt} from "@/hooks/cryptoUtils";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {useSelector} from "react-redux";

const MenuDrawer = ({toggleDrawer, open}) => {
  const router = useRouter();
  const [plans, setPlans] = useState();

  const isHalfYearly = useSelector(state => state?.citymax?.isHalfYearly);

  const fetchPlans = () => {
    axios
      .get(baseURL + endPoints.cityMaxPage.getAllPlans)
      .then(res => {
        setPlans(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // const arr1 = [
  //   {
  //     label: "CityMax Ultra",
  //     link: "",
  //   },
  //   {
  //     label: "CityMax Pro",
  //     link: "",
  //   },
  //   {
  //     label: "CityMax Lite",
  //     link: "",
  //   },
  //   {
  //     label: "CityMax Mini",
  //     link: "",
  //   },
  //   {
  //     label: "CityMax Appliances",
  //     link: "",
  //   },
  // ];
  // const arr2 = [
  //   {
  //     label: "Furniture Sale",
  //     link: "",
  //   },
  //   {
  //     label: "CF For Businesses",
  //     link: "",
  //   },
  //   {
  //     label: "Pay your dues",
  //     link: "",
  //   },
  // ];
  // const arr3 = [
  //   {
  //     label: "How It Works?",
  //     link: "",
  //   },
  //   {
  //     label: "FAQs",
  //     link: "",
  //   },
  //   {
  //     label: "Contact us",
  //     link: "",
  //   },
  // ];

  const userId = getLocalStorage(decrypt("_ga"));
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
        <img
          className={styles.logo}
          src={`${IconLink + "citymax_final.svg"}`}
        />

        <div className={styles.content_wrapper}>
          <div className={styles.map_wrapper}>
            {plans?.citymax_plans
              ?.filter(item =>
                isHalfYearly
                  ? item.attr_name === "6 Months"
                  : item.attr_name === "12 Months",
              )
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `/choose-products/${item.id}/${isHalfYearly ? 6 : 12}`,
                    )
                  }
                  className={styles.map_item}>
                  {item.product_name}
                </div>
              ))}
          </div>

          <div className={styles.line}></div>

          <div className={styles.map_wrapper}>
            {string.landing_page.header.menuList2?.map((item, index) => (
              <>
                <a
                  key={index.toString()}
                  href={item.link}
                  target={index === 0 ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={styles.map_item}>
                  {item.item}
                </a>
              </>
            ))}
          </div>

          <div className={styles.line}></div>

          <div className={styles.map_wrapper}>
            {string.landing_page.header.menuList3?.map((item, index) => (
              <>
                <a
                  key={index.toString()}
                  className={styles.map_item}
                  target={index === 0 ? "_blank" : "_self"}
                  rel="noreferrer"
                  href={
                    index === 3
                      ? userId
                        ? "/usersettings"
                        : "https://test.rentofurniture.com/user_sign_up"
                      : item.link
                  }>
                  {item?.item}
                </a>
                {index === 2 && <div className={`${styles.line} mt-4`}></div>}
              </>
            ))}
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
