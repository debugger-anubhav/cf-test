import * as React from "react";
import Popover from "@mui/material/Popover";
import {DownArrow} from "@/assets/icon";
import styles from "./style.module.css";

export default function PopOver({list, item}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  console.log(list);
  return (
    <div>
      <div
        // aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className="flex items-center">
        {item}
        <DownArrow
          size={20}
          color={"#45454A"}
          className={open ? styles.arrow_up : styles.arrow_down}
        />
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
          marginTop: "0.9rem",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <div className={styles.sub_item_wrapper}>
          {list?.map((item, index) => (
            <p className={styles.sub_item} key={index.toString()}>
              {item}
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
}
