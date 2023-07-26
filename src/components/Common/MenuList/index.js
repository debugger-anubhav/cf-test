import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import PopOver from "../PopOver";

const MenuList = () => {
  const menuList = [
    // "Home Furniture", 'Appliances', 'Office Furniture', "Combos"
    {item: "Home Furniture", selectItem: string.Menu_list.Home_Furniture},
    {item: "Appliances", selectItem: string.Menu_list.Appliances},
    {item: "Office Furniture", selectItem: string.Menu_list.Office_Furniture},
    {item: "Combos", selectItem: string.Menu_list.Combos},
  ];
  return (
    <div className={styles.menu_list_wrapper}>
      <div className={styles.menu_list_left}>
        {menuList?.map((list, index) => (
          <div className={styles.item_wrap} key={index.toString()}>
            {/* {list.item} */}
            {/* <DownArrow size={20} color={'#45454A'} /> */}
            <PopOver list={list.selectItem} item={list.item} />
          </div>
        ))}
      </div>
      <div className={styles.menu_list_right}>
        <p className={styles.item_wrap}>Offers</p>
        <p className={`${styles.item_wrap}`} style={{marginRight: "0"}}>
          CF for buisness
        </p>
      </div>
    </div>
  );
};
export default MenuList;
