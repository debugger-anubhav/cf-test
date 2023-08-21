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
  addOutStockProduct,
  addParentCategoryId,
  addSetProduct,
  addSingleProduct,
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
    dispatch(addProductCategory(hoverRef.current));
    dispatch(addParentCategoryId(parentCategoryId));
    dispatch(addProductName(item));

    dispatch(addSubCategoryId(""));
    dispatch(addProductName(null));

    dispatch(addAllProduct(true));
    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));
    setAnchorEl(null);
    router.push(
      `/category/${homePageReduxData?.cityName.toLowerCase()}/all}
      }`,
    );
  };

  const handleSelectedProduct = (e, item) => {
    // console.log(item?.cat_name.trim().split(" ").join("-").toLowerCase(), "item?.cat_name.trim()")
    dispatch(addSubCategoryId(item?.id));
    dispatch(addProductName(item));
    dispatch(addProductCategory(hoverRef.current));
    dispatch(addSingleProduct([]));
    dispatch(addSetProduct([]));
    dispatch(addOutStockProduct([]));

    router.push(
      `/category/${homePageReduxData?.cityName.toLowerCase()}/${item?.cat_name
        .trim()
        .split(" ")
        .join("-")
        .toLowerCase()}
      }`,
    );
    setAnchorEl(null);
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
