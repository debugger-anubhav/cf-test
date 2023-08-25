import React from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";

const CityShieldDrawerForCart = ({onClose}) => {
  return (
    <Drawer
      anchor="right"
      open={true} // Adjust open state as needed
      onClose={onClose}>
      <div className={styles.drawer_wrapper}></div>
    </Drawer>
  );
};

export default CityShieldDrawerForCart;
