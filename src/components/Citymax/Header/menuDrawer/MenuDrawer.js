import React, {useEffect, useState} from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close} from "@/assets/icon";
import styles from "./styles.module.css";
import {useRouter} from "next/navigation";
import {IconLink} from "../../../../assets/icon";
import string from "@/constants/Constant.json";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
// import {useDispatch, useSelector} from "react-redux";
// import {reduxSetModalState} from "@/store/Slices";
// import LoginModal from "@/components/LoginPopups";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {useSelector} from "react-redux";

const MenuDrawer = ({toggleDrawer, open, toggleLoginModal, setClick}) => {
  const {checkAuthentication} = useAuthentication();
  const router = useRouter();
  // const dispatch = useDispatch();
  const [plans, setPlans] = useState();
  // const [loginModal, setLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState();

  // const toggleLoginModal = bool => {
  //   toggleDrawer();
  //   dispatch(reduxSetModalState(bool));
  //   setLoginModal(bool);
  // };

  const isHalfYearly = useSelector(state => state?.citymax?.isHalfYearly);

  const fetchPlans = () => {
    axios
      .get(baseURL + endPoints.cityMaxPage.getAllPlans)
      .then(res => {
        setPlans(res?.data?.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // const userId = getLocalStorage(decrypt("_ga"));

  const handleAuthentication = async () => {
    const isAuth = await checkAuthentication();
    setIsLogin(isAuth);
  };

  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      classes={{paper: styles.customDrawer}}>
      <div className={`${styles.drawer_wrapper} `}>
        <div onClick={toggleDrawer} className={styles.close_icon}>
          <Close color={"#45454A"} size={20} />
        </div>
        <img
          className={styles.logo}
          src={`${IconLink + "citymax_final.svg"}`}
        />

        <div className={styles.content_wrapper}>
          <div className={styles.map_wrapper}>
            {plans?.citymax_plans
              ?.filter(item =>
                isHalfYearly
                  ? item.attr_name === "6 Months"
                  : item.attr_name === "12 Months",
              )
              .map((item, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(
                      `/choose-products/${item.id}/${isHalfYearly ? 6 : 12}`,
                    )
                  }
                  className={styles.map_item}>
                  {item.product_name}
                </div>
              ))}
          </div>

          <div className={styles.line}></div>

          {/* <LoginModal
            closeModal={() => toggleLoginModal(false)}
            isModalOpen={loginModal}
            // setIsLogin={bool => {
            //   setIsLogin(bool);
            // }}
            handleChangeRoute={() => {
              router.push("/usersettings");
            }}
          /> */}

          <div className={styles.map_wrapper}>
            {string.landing_page.header.menuList2?.map((item, index) => (
              <>
                <a
                  key={index.toString()}
                  href={item.link}
                  target={index === 0 ? "_blank" : "_self"}
                  rel="noreferrer"
                  className={styles.map_item}>
                  {item.item}
                </a>
              </>
            ))}
          </div>

          <div className={styles.line}></div>

          <div className={styles.map_wrapper}>
            {string.landing_page.header.menuList3?.map((item, index) => (
              <>
                <a
                  key={index.toString()}
                  className={styles.map_item}
                  target={index === 0 ? "_blank" : "_self"}
                  rel="noreferrer"
                  onClick={() => {
                    if (isLogin) router.push("/usersettings");
                    else {
                      toggleDrawer();
                      setClick("profile");
                      toggleLoginModal(true);
                    }
                  }}
                  href={
                    index === 3
                      ? isLogin && "/usersettings"
                      : // : "https://test.rentofurniture.com/user_sign_up"
                        item.link
                  }>
                  {item?.item}
                </a>
                {index === 2 && <div className={`${styles.line} mt-4`}></div>}
              </>
            ))}
          </div>

          <div className={styles.button} onClick={() => router.push("/")}>
            <p className={styles.back_txt}>Back to Cityfurnish</p>
            <img
              src={`${IconLink + "home-cityfurnish.svg"}`}
              className={styles.home_icon}
            />
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
