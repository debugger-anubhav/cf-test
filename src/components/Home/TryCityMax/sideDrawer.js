import * as React from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close, ForwardArrow} from "@/assets/icon";

export default function SideDrawer() {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };
  const sidebarDetail = [
    {
      heading: "Select Tenure of Subscription",
      subheading:
        "Select your preferred duration of subscription. Don't worry, you can extend it later if need be",
    },
    {
      heading: "Select a Plan",
      subheading: "Choose a plan which best suits your need.",
    },
    {
      heading: "Choose The Products",
      subheading:
        "Click on each placeholder box and choose the furniture and appliances you like",
    },
    {
      heading: "Complete the Order & On Boarding Process",
      subheading:
        "Pay the subscription fee and upload documents required for KYC",
    },
    {
      heading: "Take The Delivery",
      subheading:
        "We will deliver your products within 4 days after KYC completion",
    },
    {
      heading: "Return or Extend",
      subheading:
        "Ask for products return once your subscription period is over. Subscription keeps auto extending until you ask for products pickup.",
    },
  ];

  const list = anchor => (
    <div
      style={
        {
          // width: anchor === "top" || anchor === "bottom" ? "auto" : "530px",
        }
      }
      className={styles.drawer_wrapper}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <div className={styles.sidebar_wrapper}>
        <div className={styles.left}>
          <div className={styles.sidebar_header}>
            <div className="flex flex-col">
              <p className={styles.sidebar_header_subheading}>CityMax</p>
              <p className={styles.sidebar_header_heading}>How it works</p>
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
                </div>
              </div>
              {index !== sidebarDetail?.length - 1 && (
                <div className={styles.divider}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <div
          className="w-fit cursor-pointer px-8"
          onClick={e => {
            toggleDrawer(anchor, false)(e);
          }}>
          <Close size={25} color={"#45454A"} />
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <button
          className={styles.how_it_works_button}
          onClick={toggleDrawer("right", true)}>
          <p className={styles.how_it_works_paragraph}>How it works</p>
          <ForwardArrow
            size={18}
            color={"#597492"}
            className={styles.forward_arrow}
          />
        </button>
        <Drawer
          anchor={"right"}
          open={state.right}
          onClose={toggleDrawer("right", false)}>
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
