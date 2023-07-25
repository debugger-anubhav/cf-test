import * as React from "react";
import styles from "./style.module.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close, Icons} from "@/assets/icon";
import Image from "next/image";
import string from "@/constants/Constant.json";

export default function CommonDrawer({DrawerName}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = anchor =>
    DrawerName === "menu" ? (
      <div
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className={styles.drawer_wrapper}>
        <div
          className={styles.drawer_close}
          onClick={() => toggleDrawer("left", false)}>
          <Close color={"#000"} size={25} className={styles.close_icon} />
        </div>
        <div className={styles.drawer_content}>
          <Image src={Icons.CityFurnishLogo} className={styles.drawer_logo} />
          <div className={styles.menu_list}>
            {string.landing_page.header.menuList1?.map((item, index) => (
              <p
                className={styles.menu_item}
                key={index.toString()}
                onClick={() => console.log(item.link)}>
                {item.item}
              </p>
            ))}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.menu_list}>
            {string.landing_page.header.menuList2?.map((item, index) => (
              <p
                className={styles.menu_item}
                key={index.toString()}
                onClick={() => console.log(item.link)}>
                {item.item}
              </p>
            ))}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.menu_list}>
            {string.landing_page.header.menuList3?.map((item, index) => (
              <p
                className={styles.menu_item}
                key={index.toString()}
                onClick={() => console.log(item.link)}>
                {item.item}
              </p>
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.drawer_wrapper}>
        <div
          className={styles.drawer_close}
          onClick={() => toggleDrawer(false)}>
          <Close color={"#000"} size={25} className={styles.close_icon} />
        </div>
        <div className={styles.drawer_content}>
          <h1 className={styles.select_heading}>Select your city</h1>
        </div>
      </div>
    );

  return (
    <div className={"flex"}>
      <div onClick={toggleDrawer("left", true)}>
        {DrawerName === "menu" ? (
          <Image
            src={Icons.Menu}
            alt="menu-icon"
            className={styles.menu_icon_drawer}
          />
        ) : (
          <span className={styles.header_city_name}>Ghaziabad</span>
        )}
      </div>
      <SwipeableDrawer
        anchor={"left"}
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}>
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
