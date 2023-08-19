import * as React from "react";
import Popover from "@mui/material/Popover";
import styles from "../../Category/SubHeader/Subheader/style.module.css";
import {sortByText} from "@/constants/constant";
import {DownPopUpArrow} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {addFilteredItem} from "@/store/Slices/categorySlice";
import {useState} from "react";

export default function CategoryPopover({
  btnName,
  filterName,
  emptyFilterItem,
  setfiltereSaved,
}) {
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const getAllProductWithFilterData = useSelector(
    state => state.categoryPageData,
  );

  const filtereData = getAllProductWithFilterData?.prdoucWithFilter?.filters;

  const [filterList, setFilterList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  console.log(filterList, "filterList");

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? "filter-popover" : undefined;

  const handleFilteredItems = e => {
    let updatedFilteredList = [...categoryPageReduxData?.filteredItems];
    console.log(updatedFilteredList, "updatedFilteredList");
    if (e.target.checked) {
      updatedFilteredList = [
        ...categoryPageReduxData?.filteredItems,
        e.target.value,
      ];
    } else {
      updatedFilteredList.splice(
        categoryPageReduxData?.filteredItems.indexOf(e.target.value),
        1,
      );
    }
    setFilterList(updatedFilteredList);
    dispatch(addFilteredItem(updatedFilteredList));
  };

  // useEffect(() => {
  //   dispatch(addFilteredItem([]));
  //   setfiltereSaved(false);
  // }, [emptyFilterItem]);

  return (
    <div>
      <div className={styles.filter} onClick={handleClick}>
        <div className={styles.filterbox}>
          <div className={styles.filter_text_container}>
            <p className={styles.filter_text}>{filterName}</p>
          </div>
          <div>
            <DownPopUpArrow
              size={20}
              // size={styles.icon_size}
              color={"#45454A"}
              className={open ? styles.arrow_up : styles.arrow_down}
              // onClick={e => handleOpenSubCategory(e)}
            />
          </div>
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
          sx={{top: "3.5rem", borderRadius: "16px"}}>
          <div className="rounded-2xl">
            {filterName === "Filter" ? (
              <div className="gap-6 shadow-md w-[228px] rounded-2xl max-h-[355px] border-[2px] border-71717A bg-white py-4 px-4">
                {/* <div className=" flex flex-col max-h-[259px] bg-red-100 overflow-y-scroll "> */}
                <div className={styles.mapped_filter}>
                  {/* {CategoryFilterData.map((ele, index) => { */}
                  {filtereData?.map((ele, index) => {
                    return (
                      <div
                        // className="h-[37px] flex items-center justify-between"
                        className={styles.single_filter_text}
                        key={index.toString()}>
                        <p htmlFor={index} className={styles.option_text}>
                          {ele?.filter_name}
                        </p>
                        <input
                          type="checkbox"
                          id={index}
                          name="filterProducts"
                          value={ele.filter_name}
                          checked={categoryPageReduxData?.filteredItems.includes(
                            ele?.filter_name,
                          )}
                          className="pr-1"
                          // {
                          // }
                          // }
                          onChange={e => handleFilteredItems(e)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 w-full flex justify-center">
                  <div className={styles.btn_container}>
                    <p className={styles.apply_btn}>Apply</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gap-6 shadow-md w-[213px] rounded-2xl border-[2px] border-71717A bg-white p-4">
                {sortByText.map((ele, index) => {
                  return (
                    <div
                      // className="pb-[6.5px] flex justify-between"
                      className={styles.sorted_text}
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
