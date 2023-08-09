// import React, {useEffect} from "react";
// import styles from "./style.module.css";
// import string from "@/constants/Constant.json";
// import Image from "next/image";
// import {useDispatch, useSelector} from "react-redux";
// import {useQuery} from "@/hooks/useQuery";
// import {endPoints} from "@/network/endPoints";
// import {addCategory, addSelectedFurnitureCategory} from "@/store/Slices";
// import {categoryImageBaseUrl} from "@/constants/constant";
// // import {useRouter} from "next/navigation";
// // import axios from "axios";
// // import { HomePageImages } from "@/assets/images";

// const RentFurnitureAndAppliances = () => {
//   const dispatch = useDispatch();
//   const {category: getCategory} = useSelector(state => state.homePagedata);
//   // const homePageReduxData = useSelector(state => state.homePagedata);

//   // const router = useRouter();

//   const {refetch: getAllCategory} = useQuery("category", endPoints.category);

//   useEffect(() => {
//     getAllCategory()
//       .then(res => {
//         dispatch(addCategory(res?.data?.data));
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch(addCategory([]));
//       });
//   });

//   const handleSubCategory = rentItem => {
//     dispatch(addSelectedFurnitureCategory(rentItem));
//     // router.push(`/${homePageReduxData?.cityName}/${rentItem.seourl}`);
//   };
//   console.log(getCategory, "getCategorygetCategory");

//   return getCategory?.length ? (
//     <div className={styles.rent_furniture_wrapper}>
//       <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
//       <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
//       <div className={styles.card_div}>
//         {getCategory?.map((item, index) => (
//           <div key={index}>
//             <div className="relative">
//               <div onClick={() => handleSubCategory(item)}>
//                 <Image
//                   src={categoryImageBaseUrl + item?.category_image}
//                   width={200}
//                   height={200}
//                   alt="Rent Appliance And Furniture"
//                   className={styles.img}
//                 />
//               </div>
//             </div>
//             <div className="xl:pl-3 macbook:pl-0">
//               <h3 className={styles.label}>{item?.cat_name}</h3>
//               <p className={styles.desc}>{item?.page_heading}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   ) : null;
// };
// export default RentFurnitureAndAppliances;

import React, {useEffect} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {RentFurniture} from "@/constants/constant";
// import Skeleton from "react-loading-skeleton";
import Skeleton from "@mui/material/Skeleton";

const RentFurnitureAndAppliances = () => {
  const [loading, setLoading] = React.useState(true);

  // will be replace by api data
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.rent_furniture_wrapper}>
      <h1 className={styles.head}>{string.landing_page.Rent_furni}</h1>
      <h2 className={styles.subhead}>{string.landing_page.Explore_by}</h2>
      {loading ? (
        <>
          <div className={styles.rent_furniture_skeleton}>
            {RentFurniture.map((item, index) => (
              <div key={index.toString()}>
                <Skeleton variant="rectangular" height={310} className="mb-4" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.card_div}>
          {RentFurniture?.map((item, index) => (
            <div key={index.toString()} className={styles.card_wrapper}>
              <img
                src={item.img}
                alt="RentFurnitureImage"
                className={styles.category_img}
              />

              <div className={styles.label_wrapper}>
                <h3 className={styles.label}>{item.label}</h3>
                <p className={styles.desc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default RentFurnitureAndAppliances;
