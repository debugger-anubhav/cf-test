import {Drawer} from "@mui/material";
import React, {useState} from "react";
import styles from "./styles.module.css";
import {Close} from "@/assets/icon";
import SelectionCircle from "@/components/Documentation/SelectionCircle/SelectionCircle";

const OrderTypeDrawer = ({
  orderTypeOptions,
  isDropdownOpen,
  closeDropdown,
  handleClick,
  selectedValue,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const Content = () => (
    <>
      {isBottomShareDrawer ? (
        <>
          <p className={styles.drawer_head}>Select your order type</p>
          <div className={styles.line}></div>
          {orderTypeOptions.map((option, index) => (
            <div
              className={`${styles.ordertype_option_mobile}`}
              key={index}
              value={option}
              onClick={() => {
                handleClick(option);
              }}>
              {option}
              <SelectionCircle showInner={option === selectedValue} />
            </div>
          ))}
        </>
      ) : (
        orderTypeOptions.map((option, index) => (
          <div
            className={`${
              index === 1
                ? "!pb-0 rounded-b-xl hover:!pb-3 hover:!-mb-3"
                : "mt-3 "
            } ${styles.ordertype_option}`}
            key={index}
            value={option}
            onClick={() => {
              handleClick(option);
            }}>
            {option}
          </div>
        ))
      )}
    </>
  );
  return (
    <div>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isDropdownOpen}
          onClose={closeDropdown}
          classes={{paper: styles.bottomDrawer}}>
          <div className={styles.close_icon} onClick={closeDropdown}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <Content />
        </Drawer>
      ) : (
        isDropdownOpen && <Content />
      )}
    </div>
  );
};

export default OrderTypeDrawer;
