import React, {useState} from "react";
import styles from "./styles.module.css";
import {Drawer} from "@mui/material";
import {Close} from "@/assets/icon";

const CityMaxDrawer = ({toggleDrawer, open}) => {
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
      heading: "Select Tenure of Subscription",
      subheading:
        "Select your preferred duration of subscription. Don't worry, you can extend it later if need be.",
    },
    {
      heading: "Select a Plan",
      subheading: "Choose a plan which best suits your need.",
    },
    {
      heading: "Choose The Products",
      subheading:
        "Click on each placeholder box and choose the furniture and appliances you like.",
    },
    {
      heading: "Complete the Order & On Boarding Process",
      subheading:
        "Pay the subscription fee and upload documents required for KYC.",
    },
    {
      heading: "Take The Delivery",
      subheading:
        "We will deliver your products within 4 days after KYC completion.",
    },
    {
      heading: "Return or Extend",
      subheading:
        "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup.",
    },
    {
      heading: "Return or Extend",
      subheading:
        "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup.",
    },
    {
      heading: "Return or Extend",
      subheading:
        "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup.",
    },
  ];

  return (
    <Drawer
      anchor={isBottomDrawer ? "bottom" : "right"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}
      transitionDuration={{enter: 400, exit: 200}}>
      <div className={styles.drawer_main_container}>
        <div className={styles.close_icon} onClick={toggleDrawer}>
          <Close color={"#45454A"} size={24} className="cursor-pointer" />
        </div>
        <div>
          <div>
            <div className={styles.sidebar_header}>
              <div className="flex flex-col">
                <p className={styles.sidebar_header_subheading}>CityMax</p>
                <p className={styles.sidebar_header_heading}>How it works</p>
              </div>
            </div>

            <div className="h-[90vh] overflow-scroll pb-[130px] md:pb-0 ">
              {sidebarDetail?.map((item, index) => (
                <div
                  className={styles.drawer_map_wrapper}
                  key={index.toString()}>
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
                    </div>
                  </div>
                  {index !== sidebarDetail?.length - 1 && (
                    <div className={styles.divider}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default CityMaxDrawer;
