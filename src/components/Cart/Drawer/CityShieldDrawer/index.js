import React, {useState} from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close} from "@/assets/icon";
import CityShieldContent from "./cityShieldContent";
const CityShieldDrawerForCart = ({
  toggleDrawer,
  open,
  cityShieldOriginalPrice,
  cityShieldCurrentPrice,
  cityShieldDiscount,
  toggleCheckbox,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      <div className={styles.main_container}>
        <div
          className={styles.close_icon}
          onClick={() => {
            toggleDrawer();
          }}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        <CityShieldContent
          cityShieldCurrentPrice={cityShieldCurrentPrice}
          cityShieldOriginalPrice={cityShieldOriginalPrice}
          cityShieldDiscount={cityShieldDiscount}
          toggleDrawer={toggleDrawer}
          toggleCheckbox={bool => toggleCheckbox(bool)}
        />
      </div>
    </Drawer>
  );
};

export default CityShieldDrawerForCart;
