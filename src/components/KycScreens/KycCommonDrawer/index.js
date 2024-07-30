import * as React from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close} from "../../../assets/icon";
import {useEffect} from "react";

export default function KycCommonDrawer({content, changeState, heading}) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isBottomShareDrawer, setIsBottomShareDrawer] = React.useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  const toggleDrawer = open => event => {
    setIsOpen(open);
  };

  useEffect(() => {
    changeState(isOpen);
  }, [isOpen]);

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      <Drawer
        anchor={isBottomShareDrawer ? "bottom" : "right"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{paper: styles.rightDrawer}}
        transitionDuration={{enter: 400, exit: 200}}>
        <div className={styles.common_drawer_wrapper}>
          <div className="w-full">
            <div className={styles.mobile_close_icon}>
              <div
                onClick={event => {
                  event.stopPropagation();
                  toggleDrawer(false)();
                }}
                className="h-[24px]">
                <Close color={"#45454A"} size={24} className="cursor-pointer" />
              </div>
            </div>
            <div className={styles.content_wrapper}>
              <div className={`${styles.heading} items-baseline`}>
                {heading}
              </div>
              {content}
            </div>
          </div>
          <div className={`md:flex hidden `}>
            <div
              onClick={event => {
                event.stopPropagation();
                toggleDrawer(false)();
              }}
              className={styles.web_close_icon_wrapper}>
              <Close
                color={"#45454A"}
                size={24}
                className="cursor-pointer "
                onClick={event => {
                  event.stopPropagation();
                  toggleDrawer(false)();
                }}
              />
            </div>
          </div>
        </div>

        {/* <div className={styles.drawer_content_wrapper}>
          <div className="flex flex-col w-full">
            <div className={`${styles.heading} items-baseline`}>{heading}</div>
            {content}
          </div>
          <div className="flex">
            <span
              onClick={event => {
                event.stopPropagation();
                toggleDrawer(false)();
              }}>
              <Close size={25} className={"cursor-pointer relative z-20"} />
            </span>
          </div>
        </div> */}
      </Drawer>
    </div>
  );
}
