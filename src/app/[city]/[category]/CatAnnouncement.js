// import React from "react";
// import styles from "@/components/Common/AnnouncementBar/style.module.css";
// import {IoClose} from "react-icons/io5";
// // import string from "@/constants/Constant.json";
// // import {useDispatch, useSelector} from "react-redux";
// // import {setAnnouncementBar} from "@/store/Slices";

// export default async function AnnouncementBar({closeBar}) {
//   // const dispatch = useDispatch();
//   // const closeBar = useSelector(state => state.homePagedata.announcementBar);

//   return (
//     <>
//       {!closeBar && (
//         <div className={styles.announcement_bar_wrapper}>
//           <p className={styles.announcement_bar_text}>
//             Exclusive Offer - Additional 20% OFF. Use Code 'RENT20'
//           </p>
//           <p
//             className={styles.announcement_close_icon}
//             // onClick={() => dispatch(setAnnouncementBar(true))}
//           >
//             <IoClose size={20} color={"#fff"} className={"cursor-pointer"} />
//           </p>
//         </div>
//       )}
//     </>
//   );
// }

// export async function getServerSideProps() {
//   const closeBar = true; // Fetch the closeBar data here

//   return {
//     props: {
//       closeBar,
//     },
//   };
// }

"use client";
import AnnouncementBar from "@/components/Common/AnnouncementBar";
export default AnnouncementBar;
