import {DownArrow} from "@/assets/icon";
import styles from "./style.module.css";
import * as React from "react";
import Popover from "@mui/material/Popover";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {
  addProductCategory,
  addProductName,
  addSubCategoryId,
} from "@/store/Slices";
import {
  addAllProduct,
  addFilteredItem,
  addOutStockProduct,
  addOutStockProductAll,
  // addOutStockProduct,
  addParentCategoryId,
  // addSetProduct,
  addSetProductAll,
  addSingleAllProduct,
  // addSetProduct,
  // addSingleAllProduct,
  addSingleProduct,
  // addSubCategoryMetaData,
} from "@/store/Slices/categorySlice";

const PopOver = ({list, item, parentCategoryId}) => {
  const homePageReduxData = useSelector(state => state.homePagedata);

  const hoverRef = React.useRef("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const router = useRouter();
  const dispatch = useDispatch();

  // const handleClick = (event, item) => {
  //   setAnchorEl(event.currentTarget);
  // };
  const handleCategory = (event, item) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handMainCategory = e => {
    const previouseSubCategory = JSON.parse(
      localStorage.getItem("subCategory"),
    );
    dispatch(addFilteredItem([]));
    dispatch(addProductCategory(hoverRef.current));
    localStorage.setItem("category", JSON.stringify(hoverRef.current));
    dispatch(addParentCategoryId(parentCategoryId));
    dispatch(addProductName(item));
    localStorage.setItem("subCategory", JSON.stringify("All"));
    dispatch(addSubCategoryId(""));
    dispatch(addProductName(null));
    dispatch(addAllProduct(true));
    if (previouseSubCategory !== "All") {
      dispatch(addSingleAllProduct([]));
      dispatch(addSetProductAll([]));
      dispatch(addOutStockProductAll([]));
    }

    setAnchorEl(null);
    router.push(`/category/${homePageReduxData?.cityName.toLowerCase()}/all`);
  };

  const handleSelectedProduct = (e, item) => {
    dispatch(addFilteredItem([]));
    dispatch(addAllProduct(false));
    const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));

    // Update localStorage with the new selected subCategory
    localStorage.setItem("subCategory", JSON.stringify(item?.cat_name));

    // Now you have both the previous and new selected subCategory
    // console.log("Previous SubCategory:", previousSubCategory);
    // console.log("New SubCategory:", item?.cat_name);

    router.push(
      `/category/${homePageReduxData?.cityName.toLowerCase()}/${item?.cat_name
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase()}
      `,
    );
    dispatch(addSubCategoryId(item?.id));
    localStorage.setItem("category", JSON.stringify(hoverRef.current));
    localStorage.setItem("categoryId", JSON.stringify(item?.rootID));
    dispatch(addProductName(item));
    localStorage.setItem("subCategory", JSON.stringify(item?.cat_name));
    localStorage.setItem("subCategoryId", JSON.stringify(item?.id));
    dispatch(addProductCategory(hoverRef.current));
    // previousSubCategory !== item?.cat_name ? dispatch(addSingleProduct([])) : null
    // previousSubCategory !== item?.cat_name ? dispatch(addSubCategoryMetaData([])) : null
    console.log(previousSubCategory !== item?.cat_name, "state");
    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      // dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <button
        onClick={e => handleCategory(e, item)}
        className="flex items-center whitespace-nowrap cursor-pointer"
        onMouseEnter={e => {
          setAnchorEl(e.currentTarget);
          hoverRef.current = item;
        }}>
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
          <p className={styles.sub_item} onClick={handMainCategory}>
            All
          </p>
          {list?.map(
            (item, index) =>
              // <Link>
              {
                // { console.log(item, "itemmm") }
                // console.log(item, "item")
                return (
                  <p
                    className={styles.sub_item}
                    key={index.toString()}
                    onClick={e => handleSelectedProduct(e, item)}>
                    {item?.cat_name}
                  </p>
                );
              },
            // </Link>
          )}
        </div>
      </Popover>
    </div>
  );
};
export default PopOver;
