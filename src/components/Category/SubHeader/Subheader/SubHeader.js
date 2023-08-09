import React, {useState} from "react";
import styles from "./style.module.css";
import {DownPopUpArrow} from "@/assets/icon";
import {CategoryFilterData, sortByText} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";

const SubHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSortBy, setAnchorElSortBy] = useState(null);
  const [openFilterOptions, setOpenFilterOptions] = useState(false);
  const [filterIndex, setFilterIndex] = useState(false);
  const open = Boolean(anchorEl);
  const openSortby = Boolean(anchorElSortBy);

  console.log(filterIndex);

  const handlePopoverOpen = event => {
    // console.log(text, "textghjk")
    // text === "filter" ? (setAnchorEl(event.currentTarget)) : (setAnchorElSortBy(event.currentTarget))
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverOpenSortBy = event => {
    setAnchorElSortBy(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setAnchorElSortBy(null);
  };

  const handleOpenSubCategory = (e, index) => {
    setOpenFilterOptions(!openFilterOptions);
    setFilterIndex(index);
  };

  // console.log(openFilterOptions, "openFilterOptions")

  return (
    <div className={styles.conatiner_wrapper}>
      <div className={styles.container}>
        <ul className={styles.listings}>
          <li className={styles.list}>
            <p className={styles.route_text}>Home</p>
            <div className={styles.arrow}></div>
          </li>
          <li className={styles.list}>
            <p className={styles.route_text}>Home Furniture</p>
            <div className={styles.arrow}></div>
          </li>
        </ul>
      </div>
      <h1 className={styles.heading}>
        Single & Double Bed On Rent In Noida And Ghaziabad, Bedroom Furniture
        Rental
      </h1>
      <div className={styles.category_wrapper}>
        {[1, 2, 3, 4, 5].map((item, index) => {
          return (
            <div
              className={styles.category_container_box}
              key={index.toString()}>
              <div className="">
                <img src="https://d3juy0zp6vqec8.cloudfront.net/images/cfnewicons/dining-room-active.svg" />
              </div>
              <p className={styles.category_container}>Home furniture</p>
            </div>
          );
        })}
      </div>
      {/*  */}
      <div className={styles.filter_sort_section}>
        <div className={styles.filter}>
          <div className={styles.filter_text_container}>
            <p className={styles.filter_text}>Filter</p>
          </div>
          <div
            aria-haspopup="true"
            onMouseOver={handlePopoverOpen}
            onMouseOut={handlePopoverClose}>
            <DownPopUpArrow
              size={20}
              color={"#45454A"}
              className={open ? styles.arrow_up : styles.arrow_down}
              onClick={e => handleOpenSubCategory(e)}
            />
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------ */}
        <div className={styles.sortBy_container}>
          <p className={styles.sortBy_text}>Sort by</p>
          <div className={styles.filter}>
            <div className={styles.filter_text_container}>
              <p className={styles.filter_text}>Default</p>
            </div>
            <div
              aria-haspopup="true"
              onMouseOver={handlePopoverOpenSortBy}
              onMouseOut={handlePopoverClose}>
              <DownPopUpArrow
                size={20}
                color={"#45454A"}
                className={openSortby ? styles.arrow_up : styles.arrow_down}
                onClick={e => handleOpenSubCategory(e)}
              />
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className={styles.filter_sort_Dropdown_container}>
          {CategoryFilterData.map((ele, index) => {
            return (
              <div
                className="pb-[6.5px] flex justify-between"
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
        </div>
      )}

      {openSortby && (
        <div className={styles.sort_Dropdown_container}>
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
                {/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" /> */}
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.horizontal_line}></div>
      <div className="flex flex-wrap">
        {CategoryFilterData.map((item, index) => {
          return (
            <div
              className="flex justify-between items-center mr-4 mb-4"
              key={index.toString()}>
              <FilterCard text={item.item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubHeader;
