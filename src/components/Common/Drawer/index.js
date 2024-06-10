import * as React from "react";
import styles from "./style.module.css";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import {Close, Icons} from "@/assets/icon";
import string from "@/constants/Constant.json";
import {cityUrl} from "../../../../appConfig";
import {useDispatch, useSelector} from "react-redux";
import {selectedCityId, selectedCityName} from "@/store/Slices";
import Image from "next/image";
import {getLocalStorage, setLocalStorage} from "@/constants/constant";
import {
  addAllProduct,
  addOutStockProduct,
  addSetProduct,
  addSingleProduct,
} from "@/store/Slices/categorySlice";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useAuthentication} from "@/hooks/checkAuthentication";
import {Skeleton} from "@mui/material";

export default function CommonDrawer({
  DrawerName,
  Cities,
  data,
  toggleEmptyCartModal,
  setCity,
  setClick,
  toggleLoginModal,
}) {
  const {checkAuthentication} = useAuthentication();
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const cartItemsLength = useSelector(
    state => state.cartPageData.cartItems.length,
  );
  const reduxLoginState = useSelector(state => state.homePagedata.isLogin);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mobileCityDrawer, setMobileCityDrawer] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState();
  const [cityNameShow, setCityNameShow] = React.useState(null);

  React.useEffect(() => {
    setIsLogin(reduxLoginState);
  }, [reduxLoginState]);

  const handleresize = e => {
    if (window.innerWidth < 640) {
      // if (mobileCityDrawer) return
      setMobileCityDrawer(true);
    } else {
      // if (!mobileCityDrawer) return
      setMobileCityDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => window.removeEventListener("resize", handleresize);
  }, []);

  const hoverRef = React.useRef("");

  const toggleDrawer = (anchor, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const cityId = getLocalStorage("cityId");

  const handleAuthentication = async () => {
    const isAuth = await checkAuthentication();
    setIsLogin(isAuth);
  };

  React.useEffect(() => {
    handleAuthentication();
  }, [isLogin]);

  React.useEffect(() => {
    setCityNameShow(homePageReduxData?.cityName);
  }, [homePageReduxData?.cityName]);

  const handleMenu = (e, item) => {
    // const previousSubCategory = JSON.parse(localStorage.getItem("subCategory"));
    let previousSubCategory;
    if (typeof window !== "undefined") {
      previousSubCategory = getLocalStorage("subCategory");
    }
    if (item?.rootID !== 0) {
      if (typeof window !== "undefined") {
        setLocalStorage("category", "Home Furniture");
        setLocalStorage("categoryId", item?.rootID);
        setLocalStorage("subCategory", item?.cat_name);
        setLocalStorage("subCategoryId", item?.id);
      }
    } else {
      if (typeof window !== "undefined") {
        dispatch(addAllProduct(true));
        setLocalStorage("category", item?.cat_name);
        setLocalStorage("categoryId", item?.id);
        setLocalStorage("subCategory", "All");
      }
    }
    if (previousSubCategory !== item?.cat_name) {
      dispatch(addSingleProduct([]));
      dispatch(addSetProduct([]));
      dispatch(addOutStockProduct([]));
    }
    // router.push(
    //   `/${homePageReduxData?.cityName.toLowerCase()}/${item?.seourl}`,
    // );toggleDrawe
  };
  // const userId = decrypt(getLocalStorage("_ga"));

  const handleCityChange = (city, index) => {
    dispatch(selectedCityId(city?.id));
    dispatch(selectedCityName(city?.list_value));
    toggleDrawer("bottom", false);
    if (typeof window !== "undefined") {
      setLocalStorage("cityId", city?.id);
    }
    const newUrl = window?.location.pathname.split("/");
    newUrl[1] = city.list_value.replace(/\//g, "-")?.toLowerCase();
    const p = newUrl.join("/");
    params.city ? router.push(p) : window?.location.reload();
  };

  const list = anchor =>
    DrawerName === "menu" ? (
      <div
        role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
        className={styles.drawer_wrapper}>
        <div
          className={styles.drawer_close}
          onClick={toggleDrawer(anchor, false)}>
          <Close color={"#000"} size={25} className={styles.close_icon} />
        </div>
        <div className={styles.drawer_content}>
          <a href="/">
            <img
              src="https://d3juy0zp6vqec8.cloudfront.net/images/logo.svg"
              alt="cityfurnish-logo"
              className={styles.drawer_logo}
              width={"100%"}
              height={"100%"}
              loading="lazy"
            />
          </a>
          <div className={styles.menu_list}>
            <div
              className="lg:hidden"
              onClick={() => {
                if (isLogin) router.push("/usersettings");
                else {
                  setState({...state, left: false});
                  setClick("profile");
                  toggleLoginModal(true);
                }
              }}
              // href={isLogin && "/usersettings"}
            >
              <div className={`flex gap-1 items-center ${styles.menu_item}`}>
                <Image
                  loader={({src}) => src}
                  src={Icons.Profile}
                  alt="profile-icon"
                  loading="lazy"
                  className={`${styles.profile_icon} `}
                  aria-disabled={true}
                />
                <p>Profile</p>
              </div>
            </div>
            <div className={`lg:!hidden ${styles.divider}`}></div>
            <p
              className={styles.menu_item}
              onMouseEnter={e => {
                hoverRef.current = "All";
              }}>
              <a
                href={`/${homePageReduxData?.cityName
                  .replace(/\//g, "-")
                  ?.toLowerCase()}/rent`}>
                All products
              </a>
            </p>

            {data?.map((item, index) => (
              <p
                className={styles.menu_item}
                value={item}
                key={index.toString()}
                onClick={e => {
                  handleMenu(e, item);
                }}>
                <a
                  href={`/${homePageReduxData?.cityName
                    .replace(/\//g, "-")
                    ?.toLowerCase()}/${item?.seourl}`}>
                  {item?.cat_name}
                </a>
              </p>
            ))}
            <p className={styles.menu_item}>
              <a href={"/citymax"} target="_blank" rel="noreferrer">
                CityMax
              </a>
            </p>

            <div className={styles.divider}></div>

            {string.landing_page.header.menuList2?.map((item, index) => (
              <p className={styles.menu_item} key={index.toString()}>
                <a
                  href={item.link}
                  target={index === 0 ? "_blank" : "_self"}
                  rel="noreferrer">
                  {item?.item}
                </a>
              </p>
            ))}

            <div className={styles.divider}></div>

            {string.landing_page.header.menuList3?.map((item, index) => {
              return (
                <div
                  key={index.toString()}
                  className={styles.offer_card_skeleton}>
                  {index !== 3 ? (
                    <p className={styles.menu_item} key={index.toString()}>
                      <a href={item.link}>{item?.item}</a>
                    </p>
                  ) : (
                    <p
                      className={`${styles.menu_item} hidden lg:block`}
                      key={index.toString()}
                      onClick={() => {
                        if (isLogin) router.push("/usersettings");
                        else {
                          setState({...state, left: false});
                          setClick("profile");
                          toggleLoginModal(true);
                        }
                      }}>
                      {isLogin ? (
                        <a href="/usersettings" className="lg:flex hidden">
                          {item?.item}
                        </a>
                      ) : (
                        <span className="lg:flex hidden">{item?.item}</span>
                      )}
                    </p>
                  )}
                  {index === 2 && (
                    <div className={`!hidden lg:!flex ${styles.divider}`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ) : (
      <div>
        {mobileCityDrawer && DrawerName !== "menu" && (
          <div>
            <div
              className={styles.bottom_close_icon}
              onClick={toggleDrawer("bottom", false)}>
              <Close color={"#45454A"} size={24} className="cursor-pointer" />
            </div>
          </div>
        )}
        <div
          className={`${styles.drawer_wrapper} ${styles.city_drawer_wrapper}`}
          // onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}>
          <div
            className={`${styles.drawer_close} ${styles.city_drawer_close}`}
            // onClick={() => {
            //   mobileCityDrawer && DrawerName !== "menu"
            //     ? toggleDrawer("bottom", false)
            //     : toggleDrawer(anchor, false);
            // }}
          >
            <div onClick={toggleDrawer("left", false)}>
              <Close
                color={"#000"}
                size={25}
                className={`!mt-[5px] ${styles.close_icon}`}

                // onClick={() => {
                //   mobileCityDrawer && DrawerName !== "menu"
                //     ? toggleDrawer("bottom", false)
                //     : toggleDrawer(anchor, false);
                // }}
              />
            </div>
          </div>
          <div className={`${styles.drawer_content}`}>
            <p className={styles.select_heading}>Select your city</p>
            <div
              className={`${styles.city_container} justify-center sm:justify-start items-center`}>
              {Cities?.map((city, index) => {
                return (
                  <div
                    className={`${styles.city_wrapper}
                  `}
                    key={index.toString()}
                    onClick={() => {
                      if (cartItemsLength < 1) handleCityChange(city, index);
                      else {
                        // toggleDrawer("bottom", false);
                        setState({...state, left: false, bottom: false});
                        setCity(city);
                        toggleEmptyCartModal(true);
                      }
                    }}>
                    <Image
                      loader={({src}) => src}
                      src={cityUrl + city?.list_value_seourl + ".webp"}
                      className={`${styles.city_thambnil} ${
                        cityId === city?.id &&
                        "border-[2px] rounded-[6px] hover:rounded-[6px] border-primary"
                      }`}
                      alt={city?.list_value}
                      loading="lazy"
                      width={100}
                      height={100}
                    />
                    {city?.id === 50 ? (
                      <div className={`text-45454A ${styles.city_name}`}>
                        {city?.list_value.split("/")[0]}/
                        <br className="flex sm:hidden" />
                        {city?.list_value.split("/")[1]}
                      </div>
                    ) : (
                      <p
                        className={`${
                          cityId === city?.id
                            ? "text-[#222] font-medium "
                            : "text-45454A"
                        } ${styles.city_name}`}>
                        {city?.list_value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <div className={styles.bottom_city_content}>
              <p className={styles.bottom_subheading}>
                Get the free Cityfurnish app on your phone
              </p>
              <button className={styles.bottom_heading}>
                Download mobile app
              </button>
              <div className={styles.download_qr_wrapper}>
                <Image
                  loader={({src}) => src}
                  src={
                    "https://d3juy0zp6vqec8.cloudfront.net/images/scan-and-download.webp"
                  }
                  alt="download-QR"
                  loading="lazy"
                  width={300}
                  height={300}
                />
                <div className={styles.qr_text}>
                  <p className={styles.qr_text_span}>100+</p>
                  <div>
                    <span>People have already downloaded our app</span>
                    <Image
                      loader={({src}) => src}
                      src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                      alt="paty_icon"
                      className="!w-[24px] h-[24px] inline-block ml-2"
                      loading="lazy"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.detail_line}>
                <p className="text-[#7895B0] font-bold">100k+ </p>&nbsp;
                <div>
                  <span>People have already downloaded our app</span>
                  <Image
                    loader={({src}) => src}
                    src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/party_popper.svg"
                    alt="paty_icon"
                    className="!w-[16px] h-[16px] inline-block ml-2"
                    loading="lazy"
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  const searchParams = useSearchParams();
  const viaShopBy = searchParams.get("viaShopBy");
  React.useEffect(() => {
    if (viaShopBy) {
      toggleDrawer("left", true);
    }
  }, [viaShopBy]);
  // if(viaShopBy) {
  //   console.log(viaShopBy, DrawerName)
  // }
  return (
    <div className={"flex"}>
      <div
        onClick={
          mobileCityDrawer && DrawerName !== "menu"
            ? toggleDrawer("bottom", true)
            : toggleDrawer("left", true)
        }>
        {DrawerName === "menu" ? (
          <div className="cursor-pointer">
            <div className={`w-100 h-100 absolute z-10 cursor-pointer`}></div>
            <Image
              loader={({src}) => src}
              src={Icons.Menu}
              alt="menu-icon"
              // className={styles.menu_icon_drawer}
              className={`${styles.menu_icon_drawer} cursor-pointer relative z-[-1]`}
              loading="lazy"
            />
          </div>
        ) : (
          <span className={styles.header_city_name}>
            {cityNameShow ? (
              <>
                {params?.city || homePageReduxData?.cityName}
                {DrawerName !== "menu" && (
                  <img
                    src="https://d3juy0zp6vqec8.cloudfront.net/images/icons/arrow-drop-down.svg"
                    alt="down-arrow"
                    className="w-6 h-6 flex justify-center items-center"
                  />
                )}
              </>
            ) : (
              <Skeleton variant="text" width={80} height={20} />
            )}
          </span>
        )}
      </div>
      <SwipeableDrawer
        classes={{
          paper:
            mobileCityDrawer && DrawerName !== "menu" && styles.bottomDrawer,
        }}
        anchor={mobileCityDrawer && DrawerName !== "menu" ? "bottom" : "left"}
        className=""
        open={
          mobileCityDrawer && DrawerName !== "menu" ? state.bottom : state.left
        }
        onClose={
          mobileCityDrawer && DrawerName !== "menu"
            ? toggleDrawer("bottom", false)
            : toggleDrawer("left", false)
        }
        onOpen={
          mobileCityDrawer && DrawerName !== "menu"
            ? toggleDrawer("bottom", true)
            : toggleDrawer("left", true)
        }>
        {list("left")}
      </SwipeableDrawer>
    </div>
  );
}
