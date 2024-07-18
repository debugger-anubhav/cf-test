import {Drawer} from "@mui/material";
import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";

const SortDropdown = ({
  sortByText,
  isDropdownOpen,
  closeDropdown,
  handleSort,
  selectedOption,
}) => {
  const [isBottomShareDrawer, setIsBottomShareDrawer] = useState(false);
  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomShareDrawer(true);
    } else {
      setIsBottomShareDrawer(false);
    }
  };

  useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize); // Add resize event listener
    return () => {
      window.removeEventListener("resize", handleresize); // Clean up when component unmounts
    };
  }, []);

  const Content = () => (
    <>
      {sortByText?.map((ele, index) => {
        return (
          <div
            className={` ${selectedOption === ele.text && "bg-[#EFF5FF]"} ${
              styles.sorted_text
            }`}
            key={index.toString()}
            onClick={() => handleSort(ele?.text, index)}>
            <p className={styles.option_text}>{ele.text}</p>
            <input
              type="radio"
              id={index}
              name="sortBy"
              value={ele.text}
              className="cursor-pointer"
              checked={selectedOption === ele.text}
            />
          </div>
        );
      })}
    </>
  );
  return (
    <div
      className={
        !isBottomShareDrawer && isDropdownOpen && styles.dropdown_wrapper_desk
      }>
      {isBottomShareDrawer ? (
        <Drawer
          anchor={"bottom"}
          open={isDropdownOpen}
          onClose={closeDropdown}
          classes={{paper: styles.bottomDrawer}}>
          <div className={styles.close_icon} onClick={closeDropdown}>
            <Close color={"#45454A"} size={24} className="cursor-pointer" />
          </div>
          <div>
            <Content />
          </div>
        </Drawer>
      ) : (
        isDropdownOpen && (
          <div>
            <Content />
          </div>
        )
      )}
    </div>
  );
};

export default SortDropdown;
