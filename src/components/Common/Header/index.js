import React from "react";
import styles from "./style.module.css";
import Image from "next/image";
import {Icons, DownArrow} from "@/assets/icon";

const Header = () => {
  return (
    <div className={styles.header_wrapper}>
      <div className={styles.header_left_wrapper}>
        <Image src={Icons.Menu} alt="menu-icon" className={styles.menu_icon} />
        <Image
          src={Icons.CityFurnishLogo}
          alt="City-furnish-logo"
          className={styles.cityfurnish_logo}
        />
        <div className={styles.header_city_wrapper}>
          <p className={styles.header_city_name}>
            Ghaziabad <DownArrow size={20} color={"#45454A"} />
          </p>
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
  );
};
export default Header;
