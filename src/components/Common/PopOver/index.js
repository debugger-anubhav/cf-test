import {DownArrow} from "@/assets/icon";
import styles from "./style.module.css";
import * as React from "react";
import Popover from "@mui/material/Popover";

const PopOver = ({list, item}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <button
        onClick={handleClick}
        className="flex items-center whitespace-nowrap cursor-pointer"
        onMouseEnter={handleClick}>
        {item}
        <DownArrow
          size={20}
          color={"#45454A"}
          className={open ? styles.arrow_up : styles.arrow_down}
        />
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          marginTop: "0.9rem",
        }}>
        <div className={styles.sub_item_wrapper} onMouseLeave={handleClose}>
          <p className={styles.sub_item} onClick={handleClose}>
            All
          </p>
          {list?.map((item, index) => (
            <p
              className={styles.sub_item}
              key={index.toString()}
              onClick={handleClose}>
              {item?.cat_name}
            </p>
          ))}
        </div>
      </Popover>
    </div>
  );
};
export default PopOver;
