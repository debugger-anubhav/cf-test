// "use client"
import React from "react";
import styles from "./style.module.css";
import {Close} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {useDispatch, useSelector} from "react-redux";
import {setAnnouncementBar} from "@/store/Slices";
// import {useQuery} from "@/hooks/useQuery";
// import {addSaveditemID, addSaveditems} from "@/store/Slices/categorySlice";
// import {endPoints} from "@/network/endPoints";
// import {getLocalStorage} from "@/constants/constant";
// import {decrypt, decryptBase64} from "@/hooks/cryptoUtils";

const AnnouncementBar = () => {
  const dispatch = useDispatch();
  const closeBar = useSelector(state => state.homePagedata.announcementBar);
  // const categoryPageReduxData = useSelector(state => state.categoryPageData);

  // let cityIdStr;
  // if (typeof window !== "undefined") {
  //   cityIdStr = getLocalStorage("cityId");
  // }
  // const cityId = parseFloat(cityIdStr);

  // const {refetch: getSavedItems} = useQuery(
  //   "saved-items",
  //   endPoints.savedItems,
  //   `?cityId=${cityId}&userId=${
  //     // getLocalStorage("user_id") ?? getLocalStorage("tempUserID")
  //     decrypt(getLocalStorage("_ga")) ??
  //     decryptBase64(getLocalStorage("tempUserID"))
  //     // JSON.parse(localStorage.getItem("user_id")) ??
  //     // JSON.parse(localStorage.getItem("tempUserID"))
  //   }`,
  // );

  // useEffect(() => {
  //   getSavedItems()
  //     .then(res => {
  //       dispatch(addSaveditems(res?.data?.data));
  //       // addSaveditemID
  //       const ids = res?.data?.data.map(item => {
  //         return item?.id;
  //       });
  //       dispatch(addSaveditemID(ids));
  //     })
  //     .catch(err => console.log(err?.message || "some error"));
  // }, [categoryPageReduxData.addRemoveWhislitItem]);

  return (
    <>
      {!closeBar && (
        <div className={styles.announcement_bar_wrapper}>
          <p className={styles.announcement_bar_text}>
            {string.landing_page.announcement_bar}
          </p>
          <p
            className={styles.announcement_close_icon}
            onClick={() => dispatch(setAnnouncementBar(true))}>
            <Close size={20} color={"#fff"} className="cursor-pointer" />
          </p>
        </div>
      )}
    </>
  );
};

export default AnnouncementBar;
