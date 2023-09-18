import {DownArrow} from "@/assets/icon";
import styles from "./style.module.css";
import * as React from "react";
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
  addParentCategoryId,
  addSetProduct,
  addSetProductAll,
  addSingleAllProduct,
  addSingleProduct,
  addIsCombos,
} from "@/store/Slices/categorySlice";
import {getLocalStorage, setLocalStorage} from "@/constants/constant";
import {Popper} from "@mui/material";
import Box from "@mui/material/Box";

const PopOver = ({list, item, parentCategoryId, data}) => {
  const homePageReduxData = useSelector(state => state.homePagedata);
  const hoverRef = React.useRef("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleCategory = event => {
    setAnchorEl(event.currentTarget);
    dispatch(addAllProduct(true));

    dispatch(addFilteredItem([]));
    let previouseSubCategory;

    if (typeof window !== "undefined") {
      previouseSubCategory = getLocalStorage("subCategory");
    }
    dispatch(addFilteredItem([]));
    dispatch(addProductCategory(hoverRef.current));

    if (typeof window !== "undefined") {
      setLocalStorage("category", hoverRef.current);
      setLocalStorage("subCategory", "All");
      setLocalStorage("categoryId", data?.id);
    }
    dispatch(addParentCategoryId(parentCategoryId));
    dispatch(addProductName(item));
    dispatch(addSubCategoryId(""));
    dispatch(addProductName(null));
    dispatch(addAllProduct(true));
    if (previouseSubCategory !== "All") {
      dispatch(addSingleAllProduct([]));
      dispatch(addSetProductAll([]));
      dispatch(addOutStockProductAll([]));
    }
    router.push(
      `/${homePageReduxData?.cityName.replace(/\//g, "-").toLowerCase()}/${
        data.seourl
      }`,
    );
    if (item === "Combos") {
      dispatch(addIsCombos(true));
    } else {
      dispatch(addIsCombos(false));
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handMainCategory = e => {
    dispatch(addAllProduct(true));

    let previouseSubCategory;

    if (typeof window !== "undefined") {
      previouseSubCategory = getLocalStorage("subCategory");
    }
    dispatch(addFilteredItem([]));
    dispatch(addProductCategory(hoverRef.current));

    if (typeof window !== "undefined") {
      setLocalStorage("category", hoverRef.current);
      setLocalStorage("subCategory", "All");
      setLocalStorage("categoryId", data?.id);
    }
    dispatch(addParentCategoryId(parentCategoryId));
    dispatch(addProductName(item));
    dispatch(addSubCategoryId(""));
    dispatch(addProductName(null));
    dispatch(addAllProduct(true));
    if (previouseSubCategory !== "All") {
      dispatch(addSingleAllProduct([]));
      dispatch(addSetProductAll([]));
      dispatch(addOutStockProductAll([]));
    }

    setAnchorEl(null);
    // router.push(
    //   `/${homePageReduxData?.cityName.toLowerCase()}/${data?.seourl}`,
    // );
  };

  const handleSelectedProduct = (e, item) => {
    dispatch(addFilteredItem([]));
    dispatch(addAllProduct(false));

    const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));
    // router.push(
    //   `/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
    // );

    if (typeof window !== "undefined") {
      setLocalStorage("category", hoverRef.current);
      setLocalStorage("categoryId", item?.rootID);
      setLocalStorage("subCategory", item?.cat_name);
      setLocalStorage("subCategoryId", item?.id);
    }
    dispatch(addSubCategoryId(item?.id));
    dispatch(addProductName(item));
    dispatch(addProductCategory(hoverRef.current));
    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div
      onMouseLeave={() => {
        setAnchorEl("");
      }}>
      <a
        href={`/${homePageReduxData?.cityName
          .replace(/\//g, "-")
          .toLowerCase()}/${data?.seourl}`}>
        <button
          onClick={e => handleCategory(e)}
          className="flex items-center whitespace-nowrap cursor-pointer"
          onMouseEnter={e => {
            setAnchorEl(e.currentTarget);
            hoverRef.current = item;
          }}>
          {item}
          <DownArrow
            size={20}
            color={"#45454A"}
            // onMouseLeave={() => {
            //   setAnchorEl(null);
            //   hoverRef.current = "";
            // }}
            className={open ? styles.arrow_up : styles.arrow_down}
          />
        </button>
      </a>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // onMouseLeave={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={
          {
            // mb: "0.9rem",
          }
        }>
        {/* <div className={styles.shadow_box}> */}
        <Box
          className={styles.sub_item_wrapper}
          sx={{
            mt: 2.4,
            // boxShadow:3
          }}
          // onMouseLeave={handleClose}
        >
          <a
            href={`/${homePageReduxData?.cityName
              .replace(/\//g, "-")
              .toLowerCase()}/${data?.seourl}`}>
            <p className={styles.sub_item} onClick={handMainCategory}>
              All
            </p>
          </a>
          {list?.map(
            (item, index) => {
              return (
                <a
                  key={index.toString()}
                  href={`/${homePageReduxData?.cityName
                    .replace(/\//g, "-")
                    .toLowerCase()}/${item?.seourl}`}>
                  <p
                    className={styles.sub_item}
                    onClick={e => handleSelectedProduct(e, item)}>
                    {item?.cat_name}
                  </p>
                </a>
              );
            },
            // </Link>
          )}
        </Box>
        {/* </div> */}
      </Popper>
    </div>
  );
};
export default PopOver;
