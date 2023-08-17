import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
// import {CloseOutline, DownPopUpArrow} from "@/assets/icon";
import {categoryIconsUrl} from "@/constants/constant";
import FilterCard from "@/components/Common/FilterCard/FilterCard";
import CategoryPopover from "@/components/Common/categoryPopover/CategoryPopover";
import {useDispatch, useSelector} from "react-redux";
import {ForwardArrow} from "@/assets/icon";
import FilterSortDrawer from "@/components/Common/categoryPopover/categorySideBar";
import {
  addOutStockProduct,
  addSetProduct,
  addSingleProduct,
} from "@/store/Slices/categorySlice";
import {endPoints} from "@/network/endPoints";
import {useMutation} from "@/hooks/useMutation";
import SingleProduct from "../../SingleProduct/SingleProduct";
import ProductSet from "../../ProductSet/ProductSet";
import SoldOutProduct from "../../SoldOutProduct/SoldOutProduct";

const SubHeader = ({setShowRemainingComponents}) => {
  const dispatch = useDispatch();
  const {allAndSubCategory: getAllAndSubCategoryData} = useSelector(
    state => state.homePagedata,
  );
  const homePageReduxData = useSelector(state => state.homePagedata);
  const categoryPageReduxData = useSelector(state => state.categoryPageData);
  const getAllProductWithFilterData = useSelector(
    state => state.categoryPageData,
  );

  const [emptyFilterItem, setEmptyFilterItem] = useState(false);
  const [filterSaved, setfiltereSaved] = useState(false);
  const [inPageNo, setInPageNo] = useState(1);
  const [outPageNo, setOutPageNo] = useState(1);
  const [showProductSet, setShowProductSet] = useState(true);
  const [showOutStockProduct, setShowOutStockProduct] = useState(true);
  const [loading, setLoading] = React.useState(true);
  const [singleProductCount, setSingleProductCount] = useState(0);
  const [productSetCount, setProductSetCount] = useState(0);
  const [outStockCount, setOutStockCount] = useState(0);

  console.log(filterSaved, loading, "filterSaved");
  const singleProductLength =
    getAllProductWithFilterData?.singleProduct?.length;
  const setProductLength = getAllProductWithFilterData?.setProduct?.length;
  const outStockProductLength =
    getAllProductWithFilterData?.outStockProduct?.length;

  const data = {
    subCategoryId: homePageReduxData?.productName?.id,
    parentCategoryId: homePageReduxData?.productName?.rootID,
    // cityId: homePageReduxData?.cityId,
    cityId: 50,
    inPageNo,
    outPageNo,
  };

  const {mutateAsync: getAllProductWithFilter} = useMutation(
    "product-with-filter",
    "POST",
    endPoints.productWithFilter,
    data,
  );

  const getDataOfProductWithFilter = () => {
    getAllProductWithFilter()
      .then(res => {
        console.log(res?.data?.meta, "dgfhghjn");
        setSingleProductCount(res?.data?.meta?.totalSingleProduct);
        setProductSetCount(res?.data?.meta?.totalSetProduct);
        setOutStockCount(res?.data?.meta?.totalOutOfStockProduct);
        if (singleProductLength === singleProductCount) {
          setShowProductSet(false);
        }
        if (productSetCount === setProductLength) {
          setShowOutStockProduct(false);
        }
        if (outStockProductLength === outStockCount) {
          setShowRemainingComponents(true);
        }
        dispatch(
          addSingleProduct([
            ...getAllProductWithFilterData?.singleProduct,
            ...res?.data?.inStockProducts.filter(
              product => product.subProduct.length === 0,
            ),
          ]),
        );
        dispatch(
          addSetProduct([
            ...getAllProductWithFilterData?.setProduct,
            ...res?.data?.inStockProducts.filter(
              product => product.subProduct.length > 0,
            ),
          ]),
        );
        dispatch(
          addOutStockProduct([
            ...getAllProductWithFilterData?.outStockProduct,
            ...res?.data?.outOfStockProducts,
          ]),
        );
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  // console.log(showProductSet, "sssssss")

  useEffect(() => {
    getDataOfProductWithFilter();
  }, [inPageNo, outPageNo]);

  return (
    <>
      <div className={styles.conatiner_wrapper}>
        <div className={styles.container}>
          <ul className={styles.listings}>
            <li className={styles.list}>
              <p className={styles.route_text}>Home</p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>
                {homePageReduxData?.productCategory}
              </p>
              <ForwardArrow size={12} color={"#71717A"} />
            </li>
            <li className={styles.list}>
              <p className={styles.route_text}>
                {homePageReduxData?.productName?.cat_name}
              </p>
            </li>
          </ul>
        </div>
        <h1 className={styles.heading}>
          Single & Double Bed On Rent In Noida And Ghaziabad, Bedroom Furniture
          Rental
        </h1>
        <div className={styles.category_wrapper}>
          {getAllAndSubCategoryData?.map((item, index) => {
            if (item?.cat_name === homePageReduxData?.productCategory) {
              const subCategoriesWithNewObject = [
                {
                  cat_name: "All",
                  icon_image: "new-icon-image.png",
                  icon_active_image: "new-icon-image.png",
                },
                ...item?.sub_categories,
              ];

              return subCategoriesWithNewObject?.map((subItem, i) => {
                const selectedProduct =
                  homePageReduxData?.productName?.cat_name ===
                  subItem?.cat_name;
                return (
                  <>
                    <div
                      className={
                        selectedProduct
                          ? styles.category_container_box_active
                          : styles.category_container_box
                      }
                      key={i.toString()}>
                      {selectedProduct ? (
                        <div>
                          <img
                            src={`${categoryIconsUrl}${subItem?.icon_active_image}`}
                            className={styles.selected_icon}
                            // className="w-[30px] h-[30px]"
                          />
                        </div>
                      ) : (
                        <div>
                          <img
                            src={`${categoryIconsUrl}${subItem?.icon_image}`}
                          />
                        </div>
                      )}
                      <p className={styles.category_container}>
                        {subItem?.cat_name}
                      </p>
                    </div>
                  </>
                );
              });
            } else return null;
          })}
        </div>

        <div className={styles.filter_sort_section}>
          <div className={styles.filter}>
            <CategoryPopover
              btnName={"click"}
              filterName={"Filter"}
              emptyFilterItem={emptyFilterItem}
              setfiltereSaved={setfiltereSaved}
            />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div className={styles.filter} onClick>
              <CategoryPopover
                btnName={"click"}
                filterName={"Default"}
                setfiltereSaved={setfiltereSaved}
              />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.filter_sort_section_mobile}>
          <div className={styles.filter}>
            <FilterSortDrawer filterName={"Filter"} />
          </div>
          <div className="flex items-center justify-center ">
            <p className={styles.option_text}>Sortby</p>
            <div className={styles.filter}>
              <FilterSortDrawer filterName={"Default"} />
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------ */}
        </div>
        <div className={styles.horizontal_line}></div>
        {categoryPageReduxData?.filteredItems.length !== 0 && (
          <div className="flex flex-wrap">
            <div
              className={styles.single_filter_mobile}
              onClick={() => setEmptyFilterItem(true)}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
            {categoryPageReduxData?.filteredItems.length !== 0
              ? categoryPageReduxData?.filteredItems?.map((item, index) => {
                  return (
                    <>
                      <div
                        className={styles.filter_card}
                        // className="flex justify-between items-center mr-4 mb-4"
                        key={index.toString()}>
                        <FilterCard text={item} />
                      </div>
                    </>
                  );
                })
              : null}
            <div
              className={styles.single_filter}
              onClick={() => setEmptyFilterItem(true)}>
              <p className={styles.clear_All}>Clear all</p>
            </div>
          </div>
        )}
      </div>
      {/* {console.log(getAllProductWithFilterData?.singleProduct?.length, "getAllProductWithFilterData?.singleProduct?.length")} */}
      {getAllProductWithFilterData?.singleProduct?.length > 0 ? (
        <SingleProduct setInPageNo={setInPageNo} />
      ) : null}
      {getAllProductWithFilterData?.setProduct?.length > 0 &&
      showProductSet === false ? (
        <ProductSet setInPageNo={setInPageNo} />
      ) : null}
      {getAllProductWithFilterData?.outStockProduct?.length > 0 &&
      showOutStockProduct === false ? (
        <SoldOutProduct setOutPageNo={setOutPageNo} />
      ) : null}
    </>
  );
};

export default SubHeader;
