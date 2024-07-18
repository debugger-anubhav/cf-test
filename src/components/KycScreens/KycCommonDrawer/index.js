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
        onClose={toggleDrawer(false)}>
        <div className={styles.drawer_content_wrapper}>
          <div className={`${styles.heading}`}>
            {heading}
            <span
              onClick={event => {
                event.stopPropagation();
                toggleDrawer(false)();
              }}>
              <Close size={25} className={"cursor-pointer relative z-20"} />
            </span>
          </div>
          {content}
        </div>
      </Drawer>
    </div>
  );
}
