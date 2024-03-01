import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage} from "@/constants/constant";
import {addCategoryTextContent} from "@/store/Slices/categorySlice";
import {useDispatch, useSelector} from "react-redux";

const CategoryContent = ({subCategoryId}) => {
  let cityIdStr;
  // let categoryId;
  const dispatch = useDispatch();

  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  if (typeof window !== "undefined") {
    // categoryId = getLocalStorage("categoryId");
    cityIdStr = getLocalStorage("cityId");
  }
  const cityId = parseFloat(cityIdStr);

  const {refetch: getCategoryText} = useQuery(
    "category-content",
    endPoints.categoryContent,
    `?cityId=${cityId}&categoryId=${subCategoryId}`,
  );

  useEffect(() => {
    getCategoryText()
      .then(res => dispatch(addCategoryTextContent(res?.data?.data)))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className={styles.wrapper}>
      {categoryPageReduxData?.categorTextContent?.map((ele, index) => {
        return (
          <>
            <div
              dangerouslySetInnerHTML={{__html: ele?.cat_meta_keyword}}
              className={styles.dynamic_keyword}></div>
          </>
        );
      })}
    </div>
  );
};

export default CategoryContent;
