import * as React from "react";
import Drawer from "@mui/material/Drawer";
import styles from "./styles.module.css";
import {Close} from "../../../assets/icon";

export default function KycCommonDrawer({content, setChangeProfession}) {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  React.useEffect(() => {
    setChangeProfession(isOpen);
  }, [isOpen]);

  return (
    <div>
      <button onClick={toggleDrawer(true)}>Open Drawer</button>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        <div className={styles.drawer_content_wrapper}>
          <div className={`${styles.heading}`}>
            Change Profession?
            <Close
              size={25}
              className={"cursor-pointer"}
              onClick={e => {
                e.stopPropagation();
                toggleDrawer(false)();
              }}
            />
          </div>
          {content}
        </div>
      </Drawer>
    </div>
  );
}
