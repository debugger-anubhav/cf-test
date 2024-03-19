import React, {useState} from "react";
import styles from "./style.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";

const HowItWorksDrawer = ({toggleDrawer, open}) => {
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

  const sidebarDetail = [
    {
      heading: "Share your Referral Code with Friends",
      subheading: "",
    },
    {
      heading: "Your Friend uses your Referral Code while sign-up",
      subheading: "",
    },
    {
      heading: "You and your Friend both get 500 CF Coins",
      subheading:
        "Once your friend successfully place a qualifying order using referral code",
    },
    {
      heading: "Use CF Coins against Future Payments or your next Orders",
      subheading: "",
    },
  ];

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      {" "}
      <div className={styles.drawer_main_container}>
        <div className={styles.close_icon} onClick={toggleDrawer}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        <div>
          <div>
            <div className={styles.sidebar_header}>
              <div className={styles.subheader_wrapper}>
                <p className={styles.sidebar_header_heading}>How it works</p>
                <p className={styles.sidebar_header_subheading}>
                  Become our brand ambassador and earn CF Coins everytime you
                  refer someone
                </p>
              </div>
            </div>
            {sidebarDetail?.map((item, index) => (
              <div className={styles.drawer_map_wrapper} key={index.toString()}>
                <div className={styles.sidebar_benefit_wrapper}>
                  <div className={styles.sidebar_number}>
                    <p>{index + 1}</p>
                  </div>
                  <div className={styles.sidebar_detailing}>
                    <p className={styles.sidebar_detail_heading}>
                      {item.heading}
                    </p>
                    <p className={styles.sidebar_detail_subheading}>
                      {item.subheading}
                    </p>
                    {index !== sidebarDetail?.length - 1 && (
                      <div className={styles.divider}></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default HowItWorksDrawer;
