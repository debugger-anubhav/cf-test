import * as React from "react";
import styles from "./style.module.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close, Icons} from "@/assets/icon";
import Image from "next/image";
import string from "@/constants/Constant.json";

export default function CommonDrawer() {
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

  const list = anchor => (
    <div
      // style={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
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
  );

  return (
    <div className={"flex"}>
      <button onClick={toggleDrawer("left", true)}>
        <Image src={Icons.Menu} alt="menu-icon" className={styles.menu_icon} />
      </button>
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
