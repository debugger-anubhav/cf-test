// import React, {useEffect} from "react";
// import styles from "./style.module.css";
// import {useQuery} from "@/hooks/useQuery";
// import {endPoints} from "@/network/endPoints";
// import {getLocalStorage} from "@/constants/constant";
// import {addCategoryTextContent} from "@/store/Slices/categorySlice";
// import {useDispatch, useSelector} from "react-redux";

// const CategoryContent = ({subCategoryId}) => {
//   let cityIdStr;
//   // let categoryId;
//   const dispatch = useDispatch();

//   const categoryPageReduxData = useSelector(state => state.categoryPageData);

//   if (typeof window !== "undefined") {
//     // categoryId = getLocalStorage("categoryId");
//     cityIdStr = getLocalStorage("cityId");
//   }
//   const cityId = parseFloat(cityIdStr);

//   const {refetch: getCategoryText} = useQuery(
//     "category-content",
//     endPoints.categoryContent,
//     `?cityId=${cityId}&categoryId=${subCategoryId}`,
//   );

//   useEffect(() => {
//     getCategoryText()
//       .then(res => dispatch(addCategoryTextContent(res?.data?.data)))
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className={styles.wrapper}>
//       {categoryPageReduxData?.categorTextContent?.map((ele, index) => {
//         return (
//           <div
//             className={styles.dynamic_keyword}
//             dangerouslySetInnerHTML={{__html: ele?.cat_meta_keyword}}>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CategoryContent;

import React, {useEffect} from "react";
import styles from "./style.module.css";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";
import {getLocalStorage} from "@/constants/constant";
import {addCategoryTextContent} from "@/store/Slices/categorySlice";
import {useDispatch, useSelector} from "react-redux";

const CategoryContent = ({subCategoryId}) => {
  let cityIdStr;
  const dispatch = useDispatch();

  const categoryPageReduxData = useSelector(state => state.categoryPageData);

  if (typeof window !== "undefined") {
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

  const removeInlineStyles = html => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    const elements = tempElement.querySelectorAll("*");
    elements.forEach(function (element) {
      element.removeAttribute("style");
    });
    return tempElement.innerHTML;
  };

  return (
    <div className={styles.wrapper}>
      {categoryPageReduxData?.categorTextContent?.map((ele, index) => {
        return (
          <div
            key={index} // Assuming index can be used as key since no unique identifier provided
            className={styles.dynamic_keyword}
            dangerouslySetInnerHTML={{
              __html: removeInlineStyles(ele?.cat_meta_keyword),
            }}></div>
        );
      })}
    </div>
  );
};

export default CategoryContent;
