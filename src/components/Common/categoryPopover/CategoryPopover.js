import * as React from "react";
import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
import styles from "../../Category/SubHeader/Subheader/style.module.css";
import {CategoryFilterData, sortByText} from "@/constants/constant";
import {DownPopUpArrow} from "@/assets/icon";

export default function CategoryPopover({btnName, filterName}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" className='w-[200px]' onClick={handleClick}>
                {btnName}
            </Button> */}
      <div
        className="flex justify-between items-center gap-2"
        onClick={handleClick}>
        <div className={styles.filter_text_container}>
          <p className={styles.filter_text}>{filterName}</p>
        </div>
        <div
        // aria-haspopup="true"
        // onMouseOver={handlePopoverOpen}
        // onMouseOut={handlePopoverClose}
        >
          <DownPopUpArrow
            size={20}
            // size={styles.icon_size}
            color={"#45454A"}
            className={open ? styles.arrow_up : styles.arrow_down}
            // onClick={e => handleOpenSubCategory(e)}
          />
        </div>
      </div>
      <div className={styles.popover_wrapper}>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          sx={{top: "3rem", borderRadius: "16px"}}>
          <div className="rounded-2xl">
            {filterName === "Filter" ? (
              <div className="gap-6 rounded-2xl border-[2px] border-71717A bg-white p-4">
                {CategoryFilterData.map((ele, index) => {
                  return (
                    <div
                      className="pb-[6.5px] flex justify-between p-4"
                      key={index.toString()}>
                      <p className={styles.option_text}>{ele.item}</p>
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                      />
                    </div>
                  );
                })}
                <div className="mt-6 b-red-200 w-full flex justify-center">
                  <div className={styles.btn_container}>
                    <p className={styles.apply_btn}>Apply</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gap-6 rounded-2xl border-[2px] border-71717A bg-white p-4">
                {sortByText.map((ele, index) => {
                  return (
                    <div
                      className="pb-[6.5px] flex justify-between"
                      key={index.toString()}>
                      <p className={styles.option_text}>{ele.text}</p>
                      <input
                        type="radio"
                        id="html"
                        name="fav_language"
                        value="HTML"></input>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </Popover>
      </div>
    </div>
  );
}
