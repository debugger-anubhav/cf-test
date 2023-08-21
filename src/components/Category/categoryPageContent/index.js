// import React from 'react'
// import styles from "./style.module.css"
// import { useDispatch, useSelector } from 'react-redux';
// import { addCategoryContentData } from '@/store/Slices/categorySlice';
// import { useQuery } from '@/hooks/useQuery';
// import { endPoints } from '@/network/endPoints';
// import { useEffect } from 'react';

// const CategoryContent = () => {

//     const dispatch = useDispatch();
//     const homePageReduxData = useSelector(state => state.homePagedata);
//     const categoryPageReduxData = useSelector(state => state.categoryPageData);

//     const { refetch: getcategoryContent } = useQuery(
//         "category-content",
//         endPoints.categoryContent,
//         `?cityId=${homePageReduxData?.cityId}&categoryId=27`,
//         // `?cityId=46&categoryId=27`,
//     );

//     useEffect(() => {
//         getcategoryContent()
//             .then(res => {
//                 console.log(res?.data?.data, "dfghjklkjhgf")
//                 dispatch(addCategoryContentData(res?.data?.data));
//             })
//             .catch(err => console.log(err));
//     }, []);
//     const data = categoryPageReduxData?.categoryContentData
//     console.log(categoryPageReduxData?.categoryContentData, "categoryContentData")
//     return (
//         <div className={styles.content_wrapper}>
//             {
//                 data?.map((item, index) => {
//                     return (
//                         <div>
//                             <h2 className={styles.head}>{item?.cat_heading}}</h2>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default CategoryContent;
