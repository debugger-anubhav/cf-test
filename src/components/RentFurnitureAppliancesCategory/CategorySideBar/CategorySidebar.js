import React, {useState, useEffect} from "react";
import style from "./style.module.css";
import {useDispatch, useSelector} from "react-redux";
import {DownArrow} from "@/assets/icon";
import {endPoints} from "@/network/endPoints";
import {useQuery} from "@/hooks/useQuery";
import {addFilterProduct} from "@/store/Slices/categorySlice";

const CategorySidebar = () => {
  const dispatch = useDispatch();
  const ReduxHomePageData = useSelector(state => state.homePagedata);
  const CategoryReduxData = useSelector(state => state.CategoryData);
  const cityId = ReduxHomePageData.cityId;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(false);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleOpenSubCategory = (e, index) => {
    setOpenSubcategory(!openSubcategory);
    setCategoryIndex(index);
  };

  const filteredProduct = [];
  const {refetch: getAllFilterProduct} = useQuery(
    "filter-product",
    endPoints.filterProduct,
    `&cityId=${cityId}&parentCategoryId=27&subCategoryId=270`,
  );

  useEffect(() => {
    getAllFilterProduct()
      .then(res => {
        dispatch(addFilterProduct(res?.data?.data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="w-full">
      <h2 className={style.heading}>Categories</h2>
      <div className={style.sidebar_container}>
        {ReduxHomePageData?.category?.map((ele, index) => {
          return (
            <div className="flex flex-col" key={index.toString()}>
              <div className="flex  justify-between w-full items-center">
                <p className={style.title}>{ele?.cat_name}</p>
                <div
                  aria-haspopup="true"
                  onMouseEnter={handlePopoverOpen}
                  onMouseOut={handlePopoverClose}
                  className="flex items-center whitespace-nowrap">
                  {ele?.cat_names}
                  <DownArrow
                    size={20}
                    color={"#45454A"}
                    className={open ? style.arrow_up : style.arrow_down}
                    onClick={e => handleOpenSubCategory(e, index)}
                    // onClick={() => setOpenSubcategory(!openSubcategory)}
                  />
                </div>
              </div>
              <div className="flex flex-col my-[10px]">
                {
                  openSubcategory
                    ? categoryIndex === index
                      ? ele?.sub_categories?.map((element, index) => {
                          return (
                            <div
                              className={style.subCategory_container}
                              key={index.toString()}>
                              <input
                                type="radio"
                                id="sub_category"
                                value={element?.cat_name}
                                name="SubCatrgory"
                                onChange={e =>
                                  console.log(e.target.value, "e.target.value")
                                }
                              />
                              <p className={style.cat_title}>
                                {element?.cat_name}
                              </p>
                            </div>
                          );
                        })
                      : null
                    : null
                  //     }
                  // )
                }
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between w-full items-center p-[9px]">
        <h2 className={style.filter_heading}>Filters</h2>
        <p className={style.reset_btn}>Resest</p>
      </div>
      <div className={style.sidebar_container_two}>
        {CategoryReduxData?.filterItem?.filters?.map((ele, index) => {
          return (
            <div
              className="w-full flex  mb-[7px] items-center"
              key={index.toString()}>
              <input
                type="checkbox"
                id="filters"
                name="filter_category"
                value={ele?.filter_name}
                className="mb-[5px] w-[17px] h-[17px]"
                onChange={event => {
                  filteredProduct.push(event.target.value);
                  console.log(event.target.value, "lll");
                }}
              />
              <h2 className={style.filterContent}>{ele?.filter_name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySidebar;
