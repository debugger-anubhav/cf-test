import * as React from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close} from "../../../assets/icon";
import {useDispatch} from "react-redux";
import {setShowQuestionScreen} from "@/store/Slices";

export default function KycCommonDrawer({
  content,
  setChangeProfession,
  heading,
}) {
  const dispatch = useDispatch();
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

  React.useEffect(() => {
    setChangeProfession(isOpen);
    if (heading === "Questions") {
      dispatch(setShowQuestionScreen(isOpen));
    }
  }, [isOpen]);

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  return (
    <div>
      <button onClick={toggleDrawer(true)}>Open Drawer</button>
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
