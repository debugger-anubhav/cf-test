"use client";
import React, { useEffect } from "react";
import styles from "./style.module.css";
import Image from "next/image";
import { Icons, DownArrow } from "@/assets/icon";
import CommonDrawer from "../Drawer";
import { endPoints } from "@/network/endPoints";
import { useQuery } from "@/hooks/useQuery";
import { addCityList, selectedCityId } from "@/store/Slices";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/store";

const Header = () => {
  const dispatch = useDispatch();

  const { cityList: storeCityList } = useAppSelector(state => state.homePagedata);

  const { refetch: getCityList } = useQuery("city-list", endPoints.cityList);

  useEffect(() => {
    getCityList()
      .then(res => {
        dispatch(addCityList(res?.data?.data));
        dispatch(selectedCityId(res?.data?.data[0]?.id));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className={styles.header_wrapper}>
        <div className={styles.header_left_wrapper}>
          <CommonDrawer DrawerName="menu" />
          <Image
            src={Icons.CityFurnishLogo}
            alt="City-furnish-logo"
            className={styles.cityfurnish_logo}
          />
          <div className={styles.header_city_wrapper}>
            <div className={styles.header_city_name}>
              <CommonDrawer Cities={storeCityList} DrawerName="cities" />
              <DownArrow size={20} color={"#45454A"} />
            </div>
          </div>
        </div>
        <div className={styles.header_right_wrapper}>
          <div className={styles.search_wrapper}>
            <input
              placeholder="Search for Furniture, Appliances, etc"
              className={styles.search_input}
            />
            <Image
              src={Icons.Search}
              alt="search-icon"
              className={styles.header_search_icon}
            />
          </div>
          <Image
            src={Icons.Favorite}
            alt="favorite"
            className={styles.header_favorite}
          />
          <Image
            src={Icons.shoppingCard}
            alt="shopping-card-icon"
            className={styles.header_shopping_card}
          />
          <Image
            src={Icons.Profile}
            alt="profile-icon"
            className={styles.header_profile_icon}
          />
        </div>
      </div>
      <div className={styles.mobile_search_row}>
        <div className={` ${styles.search_wrapper_mobile}`}>
          <input
            placeholder="Search for Furniture, Appliances, etc"
            className={styles.search_input}
          />
          <Image
            src={Icons.Search}
            alt="search-icon"
            className={styles.header_search_icon}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
