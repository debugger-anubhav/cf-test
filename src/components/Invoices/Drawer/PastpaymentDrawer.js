import React, {useState} from "react";
import styles from "./styles.module.css";
import {Close, ForwardArrowWithLine, ToggleOff, ToggleOn} from "@/assets/icon";
import {Drawer} from "@mui/material";

const PastpaymentDrawer = ({
  toggleDrawer,
  open,
  totalAmount,
  availbal = 300,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);
  const [isCoinApplied, setIsCoinApplied] = useState(false);

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
      {" "}
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

          <p className={styles.head}>Make Payment</p>
          <div className="mt-8 md:pr-8">
            <p className={styles.total_txt}>Total Amount Due</p>
            <input className={styles.input} value={totalAmount} />

            <div className={styles.toggle_wrapper}>
              <div className="cursor-pointer ">
                {isCoinApplied ? (
                  <ToggleOn
                    size={29}
                    color={"#5774AC"}
                    onClick={() => setIsCoinApplied(false)}
                  />
                ) : (
                  <ToggleOff
                    color={"#E3E1DC"}
                    size={29}
                    onClick={() => setIsCoinApplied(true)}
                  />
                )}
              </div>
              <p className={styles.total_txt}>
                Use Cityfurnish coins (Available balance: {availbal})
              </p>
            </div>

            <button className={styles.btn}>
              Proceed and pay
              <ForwardArrowWithLine className={styles.proceed_icon} />
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PastpaymentDrawer;
