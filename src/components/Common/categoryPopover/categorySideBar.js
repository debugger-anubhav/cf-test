import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import styles from "../../Category/SubHeader/Subheader/style.module.css";
import {Close, DownPopUpArrow} from "@/assets/icon";
import {sortByText} from "@/constants/constant";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  addFilteredItem,
  addOutStockProduct,
  // addOutStockProductAll,
  addSetProduct,
  // addSetProductAll,
  addSingleProduct,
  addSortKey,
  isFilterApplied,
} from "@/store/Slices/categorySlice";
import {useRouter} from "next/navigation";

export default function FilterSortDrawer({
  filterName,
  setPageNo,
  setFilterListed,
}) {
  const dispatch = useDispatch();
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const [itemCount, setItemCount] = useState(7);
  const [selectedOption, setSelectedOption] = useState("Default");
  const router = useRouter();

  const defaultKey = 1;
  const newSortKey = 2;
  const highToLowKey = 3;
  const lowToHighKey = 4;

  const loadMoreItems = () => {
    setItemCount(itemCount + 7);
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

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

  const handleSort = (item, index) => {
    setPageNo(1);
    console.log(item);
    setSelectedOption(item);
    if (item === "New") {
      dispatch(addSortKey(newSortKey));
    } else if (item === "Price Low to High") {
      dispatch(addSortKey(lowToHighKey));
    } else if (item === "Price High to low") {
      dispatch(addSortKey(highToLowKey));
    } else {
      dispatch(addSortKey(defaultKey));
    }

    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    setState({...state, bottom: false});
  };

  const handleApply = () => {
    let url = "";

    for (let i = 0; i < categoryPageReduxData?.filteredItems.length; i++) {
      url +=
        "filter=" + encodeURIComponent(categoryPageReduxData?.filteredItems[i]);

      if (i < categoryPageReduxData?.filteredItems.length - 1) {
        url += "&";
      }
    }
    router.push(`?${url}`);

    setPageNo(1);
    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    dispatch(isFilterApplied(true));
    setFilterListed(true);
    setState({...state, bottom: false});
  };

  const filtereData = categoryPageReduxData?.filterData;

  const list = anchor => (
    <div
      // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="relative">
      <List>
        <div className="rounded-t-2xl">
          {filterName === "Filter" ? (
            <div className="gap-6 shadow-md w-full bg-white px-4 pt-4 pb-8">
              <p className={styles.headin_text}>
                {filterName === "Filter" ? filterName : selectedOption}
              </p>
              <div className="h-[1px] bg-EDEDEE" />
              <div className={`overflow-scroll ${styles.mapped_filter_mobile}`}>
                {filtereData?.map((ele, index) => {
                  // {CategoryFilterData.slice(0).map((ele, index) => {
                  return (
                    <>
                      {index < itemCount && (
                        <div
                          className={styles.single_filter_text}
                          key={index.toString()}
                          onClick={e =>
                            handleFilterDivClick(e, ele.filter_tag)
                          }>
                          <p className={styles.option_text}>
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
                            className="pr-1 cursor-pointer"
                            onChange={e => handleFilteredItems(e)}
                          />
                        </div>
                      )}
                    </>
                  );
                })}
              </div>
              {filtereData.length > itemCount && (
                <p className={styles.see_more_text} onClick={loadMoreItems}>
                  See more
                </p>
              )}
              <div className="mt-4 w-full flex justify-center">
                <div
                  className={styles.btn_container}
                  onClick={() => handleApply()}>
                  <p
                    style={{boxShadow: "rgba(0, 0, 0, 0.25)"}}
                    className={styles.apply_btn}>
                    Apply
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="gap-6 shadow-md w-full rounded-t-2xl bg-white p-4">
              <p className={styles.headin_text}>Sort By</p>
              <div className="">
                {sortByText.map((ele, index) => {
                  return (
                    <div
                      onClick={() => handleSort(ele?.text, index)}
                      className={styles.sorted_text}
                      key={index.toString()}>
                      <p className={styles.option_text}>{ele.text}</p>
                      <input
                        type="radio"
                        id={index}
                        name="sortBy"
                        value={ele.text}
                        className="cursor-pointer"
                        checked={selectedOption === ele.text}
                        // onClick={() => handleSort(ele?.text, index)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {["bottom"].map(anchor => (
        <React.Fragment key={anchor}>
          <div
            className={styles.filterbox}
            onClick={toggleDrawer(anchor, true)}>
            <div className={styles.filter_text_container}>
              <p
                className={`${
                  filterName === "Default" ? "!text-[#597492]" : "!text-71717A"
                } ${styles.filter_text}`}>
                {filterName === "Filter" ? filterName : selectedOption}
              </p>
            </div>
            <div>
              <DownPopUpArrow
                size={20}
                color={filterName === "Default" ? "#597492" : "#71717A"}
                className={state.bottom ? styles.arrow_up : styles.arrow_down}
              />
            </div>
          </div>

          <Drawer
            anchor={anchor}
            PaperProps={{
              sx: {
                borderTopRightRadius: "20px",
                borderTopLeftRadius: "20px",
                position: "absolute",
              },
            }}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{
              borderTop: "20px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}>
            <div
              // className="relative top-4 right-[24px] flex w-full justify-end z-[111] "
              className="fixed right-4 lg:right-8 w-8 h-8 bg-fff rounded-2xl cursor-pointer items-center flex justify-center -mt-12 lg:-mt-0"
              onClick={toggleDrawer("bottom", false)}>
              <Close size={25} color={"#000"} />
            </div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
