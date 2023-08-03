import React, {useState} from "react";
import style from "./style.module.css";
import SubCategoryCard from "@/components/Common/subCategoryCard/SubCategoryCard";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import {DownArrow} from "@/assets/icon";

export const ProductCalaogs = () => {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const items = [
    {item: "Default"},
    {item: "Default"},
    {item: "Default"},
    {item: "Default"},
    {item: "Default"},
  ];

  // const handlePopoverOpen = event => {
  //     setAnchorEl(event.currentTarget);
  // };
  // const handlePopoverOpen = event => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen(true);
  // };

  const handlePopoverClose = () => {
    setOpen(false);
  };

  // const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleButtonClick = event => {
    if (open) {
      setOpen(false);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(true);
    }
  };

  return (
    <div className="">
      {/* <div className="flex bg-red-300"> */}
      <div className={style.sortby_container}>
        <label className={style.sort_by_label}>Sort By : </label>
        <div>
          <div
            // aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onClick={handleButtonClick}
            // onMouseOver={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
            className="flex items-center whitespace-nowrap text-14 text-[#36454f] font-medium pr-[10px]">
            Default
            <DownArrow
              size={20}
              color={"#45454A"}
              className={open ? style.arrow_up : style.arrow_down}
              style={{marginLeft: "10px"}}
            />
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            // className="transition-transform duration-800 ease-in-out"
          >
            <Typography sx={{p: 2}}>
              {items.map(ele => {
                return <div key={ele.item}>{ele?.item}</div>;
              })}
            </Typography>
          </Popover>
        </div>
      </div>
      <div className="flex flex-wrap">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((ele, index) => {
          return (
            <div className="mr-[25px] mb-[25px]" key={index.toString()}>
              <SubCategoryCard />
            </div>
          );
        })}
      </div>
    </div>
  );
};
