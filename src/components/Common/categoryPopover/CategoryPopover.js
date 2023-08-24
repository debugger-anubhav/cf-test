import * as React from "react";
import Popover from "@mui/material/Popover";
import styles from "../../Category/SubHeader/Subheader/style.module.css";
import {sortByText} from "@/constants/constant";
import {DownPopUpArrow} from "@/assets/icon";
import {useDispatch, useSelector} from "react-redux";
import {
  addFilteredItem,
  addOutStockProduct,
  addSetProduct,
  addSingleProduct,
  addSortKey,
  isFilterApplied,
} from "@/store/Slices/categorySlice";
import {useState} from "react";

export default function CategoryPopover({
  filterName,
  isApplyFilter,
  setPageNo,
}) {
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  const [selectedOption, setSelectedOption] = useState("Default");

  const filtereData = categoryPageReduxData?.filterData;

  const defaultKey = ["subproducts", "ASC"];
  const newSortKey = ["created", "DESC"];
  const highToLowKey = ["sale_price", "DESC"];
  const lowToHighKey = ["sale_price", "ASC"];

  // const [filterList, setFilterList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setAnchorEl(null);
  }, [isApplyFilter]);

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  const handleFilterDivClick = (e, filterTag) => {
    const updatedFilteredList = [...categoryPageReduxData?.filteredItems];
    const filterIndex = updatedFilteredList.indexOf(filterTag);

    if (filterIndex === -1) {
      // If the filter is not in the list, add it
      updatedFilteredList.push(filterTag);
    } else {
      // If the filter is already in the list, remove it
      updatedFilteredList.splice(filterIndex, 1);
    }
    dispatch(addFilteredItem(updatedFilteredList));
  };

  const handleFilteredItems = e => {
    let updatedFilteredList = [...categoryPageReduxData?.filteredItems];
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
    dispatch(addFilteredItem(updatedFilteredList));
  };

  const handleApply = () => {
    setPageNo(1);
    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    dispatch(isFilterApplied(true));
    setAnchorEl(null);
  };

  const handleSort = (item, index) => {
    setPageNo(1);
    setSelectedOption(item);
    if (item === "New") {
      dispatch(addSortKey(newSortKey));
    } else if (item === "Price Low to High") {
      dispatch(addSortKey(lowToHighKey));
    } else if (item === "Price Hight to low") {
      dispatch(addSortKey([...highToLowKey]));
    } else {
      dispatch(addSortKey(defaultKey));
    }
    // Update the selected option when a radio button is clicked
    // dispatch(addSortKey(item === "New" ? newSortKey : item === "Price Low to High" ? lowToHighKey : highToLowKey));
    // dispatch(addSingleProduct([]));

    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    setAnchorEl(null);
  };

  // "sortKey": ["sale_price", "ASC"]
  // addSortKey
  return (
    <div>
      <div className={styles.filter} onClick={handleClick}>
        <div className={styles.filterbox}>
          <div className={styles.filter_text_container}>
            <p className={styles.filter_text}>
              {filterName === "Filter" ? filterName : selectedOption}
            </p>
          </div>
          <div>
            <DownPopUpArrow
              size={20}
              color={"#45454A"}
              className={open ? styles.arrow_up : styles.arrow_down}
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
                <div className={styles.mapped_filter}>
                  {filtereData?.map((ele, index) => {
                    return (
                      <div
                        className={styles.single_filter_text}
                        key={index.toString()}
                        onClick={e => handleFilterDivClick(e, ele.filter_tag)}>
                        <p htmlFor={index} className={styles.option_text}>
                          {ele?.filter_name}
                        </p>
                        <input
                          type="checkbox"
                          id={index}
                          name={ele.filter_name}
                          value={ele.filter_tag}
                          checked={categoryPageReduxData?.filteredItems.includes(
                            ele?.filter_tag,
                          )}
                          className="pr-1"
                          onChange={e => handleFilteredItems(e)}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 w-full flex justify-center">
                  <div
                    className={styles.btn_container}
                    onClick={() => handleApply()}>
                    <p className={styles.apply_btn}>Apply</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="gap-6 shadow-md w-[213px] rounded-2xl border-[2px] border-71717A bg-white p-4">
                {sortByText.map((ele, index) => {
                  return (
                    <div
                      className={styles.sorted_text}
                      key={index.toString()}
                      onClick={() => handleSort(ele?.text, index)}>
                      <p className={styles.option_text}>{ele.text}</p>
                      <input
                        type="radio"
                        id={index}
                        name="sortBy"
                        value={ele.text}
                        checked={selectedOption === ele.text}
                      />
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
