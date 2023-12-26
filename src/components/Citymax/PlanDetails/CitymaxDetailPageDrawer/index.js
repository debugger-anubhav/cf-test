import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";
import ChangePlanDrawer from "../ChangePlan/ChangePlanDrawer";
import ProductsDrawer from "../ProductsDrawer/ProductsDrawer";

const CitymaxDetailPageDrawer = ({
  toggleDrawer,
  open,
  handleAddItem,
  type,
  headType,
  slotId,
  roomId,
  swapProductDetails,
  toggleLoginModal,
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
    <div>
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        classes={{paper: styles.customDrawer}}>
        {" "}
        <div className={styles.main_container}>
          <div className={styles.close_icon} onClick={toggleDrawer}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          {type === 1 ? (
            <ProductsDrawer
              handleAddItem={handleAddItem}
              slotId={slotId}
              roomId={roomId}
              headType={headType}
              swapProductDetails={swapProductDetails}
              toggleLoginModal={toggleLoginModal}
              toggleDrawer={toggleDrawer}
            />
          ) : (
            <ChangePlanDrawer />
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default CitymaxDetailPageDrawer;
