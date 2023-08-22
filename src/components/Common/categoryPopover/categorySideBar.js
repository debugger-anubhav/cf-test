import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import styles from "../../Category/SubHeader/Subheader/style.module.css";
import {Close, DownPopUpArrow} from "@/assets/icon";
import {CategoryFilterData, sortByText} from "@/constants/constant";
import {useState} from "react";

export default function FilterSortDrawer({filterName}) {
  // const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const [state, setState] = React.useState({
    bottom: false,
  });

  const [itemCount, setItemCount] = useState(7);
  // setItemCount(1);
  console.log(setItemCount, "setItemCount");

  const loadMoreItems = () => {
    return prevCount => prevCount + 7; // Increment the item count by 7
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

  const list = anchor => (
    <div
      // sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className="relative">
      <List>
        <div className="rounded-t-2xl">
          {filterName === "Filter" ? (
            <div className="gap-6 shadow-md w-full bg-white px-4 pt-4 pb-8">
              <p className={styles.headin_text}>{filterName}</p>
              <div className={styles.mapped_filter_mobile}>
                {CategoryFilterData.slice(0, itemCount).map((ele, index) => {
                  // {CategoryFilterData.slice(0).map((ele, index) => {
                  return (
                    <div
                      className={styles.single_filter_text}
                      key={index.toString()}>
                      <p className={styles.option_text}>{ele.item}</p>
                      <input
                        type="checkbox"
                        id="filterItem"
                        name="filterProducts"
                        value={ele.item}
                        // checked={
                        //     categoryPageReduxData?.filteredItems.includes(ele?.item) ? true : false
                        // }
                        className="pr-1"
                      />
                    </div>
                  );
                })}
              </div>
              {itemCount < CategoryFilterData.length && (
                <p className={styles.see_more_text} onClick={loadMoreItems}>
                  See more
                </p>
              )}
              <div className="mt-6 w-full flex justify-center">
                <div className={styles.btn_container}>
                  <p className={styles.apply_btn}>Apply</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="gap-6 shadow-md w-full rounded-t-2xl bg-white p-4">
              <p className={styles.headin_text}>{filterName}</p>
              <div className="bg-red-300">
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
            // onClick={handleClick}
            onClick={toggleDrawer(anchor, true)}>
            <div className={styles.filter_text_container}>
              {/* <p className={styles.filter_text}>Filter</p> */}
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

          <Drawer
            anchor={anchor}
            PaperProps={{
              sx: {
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
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
              className="relative top-4 right-[24px] flex w-full justify-end z-[111]"
              onClick={toggleDrawer("bottom", false)}>
              {/* <DialogTitle sx={{ padding: 0, justifyContent: 'flex-end', display: 'flex', background: "transparent", position: 'absolute', }}> */}
              <Close size={25} color={"#000"} />
              {/* </DialogTitle> */}
            </div>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
