import React, {useState} from "react";
import AddressSection from "./AddressSection";
import ShoppingCartSection from "./ShoppingCartSection";
import styles from "./ShoppingCartSection/style.module.css";
import {Skeleton} from "@mui/material";

const CartSection = () => {
  const [tab, setTab] = useState(0);
  return (
    <div>
      {/* <AddressSection /> */}
      {tab === 0 ? (
        <>
          <ShoppingCartSection setTab={() => setTab(1)} />
        </>
      ) : (
        <AddressSection setTab={() => setTab(0)} />
      )}
    </div>
  );
};

export default CartSection;

export const CartPageSkeleton = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.left_div} id="leftDiv">
        <Skeleton variant="text" className="w-full h-full" />
      </div>
      <div className={styles.right_div} id="rightDiv">
        right
      </div>
    </div>
  );
};
