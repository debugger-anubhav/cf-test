import React, {useState} from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styles from "@/components/Common/Drawer/style.module.css";
import {Close} from "@/assets/icon";
import {cityUrl} from "../../../../appConfig";
import customStyles from "./styles.module.css";

const CityDrawer = ({
  Cities,
  toggleDrawer,
  cityId,
  open,
  cityName,
  handleCityChange,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleresize = e => {
    if (window.innerWidth < 768) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };

  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);
  return (
    <SwipeableDrawer
      anchor={isBottomDrawer ? "bottom" : "left"}
      open={open}
      onClose={toggleDrawer}
      classes={{paper: customStyles.customDrawer}}
      transitionDuration={{enter: 400, exit: 200}}>
      <div className={`${customStyles.drawer_wrapper} `}>
        {isBottomDrawer ? (
          <div onClick={toggleDrawer} className={customStyles.close_icon}>
            <Close color={"#45454A"} size={20} />
          </div>
        ) : (
          <div
            onClick={toggleDrawer}
            className={`${styles.drawer_close} ${styles.city_drawer_close}`}>
            <Close
              className={`!mt-[5px] ${styles.close_icon}`}
              color={"#45454A"}
              size={24}
            />
          </div>
        )}

        <div className={`${styles.drawer_content}`}>
          <p className={styles.select_heading}>Select your city</p>
          <div
            className={`${styles.city_container} justify-center sm:justify-start items-center`}>
            {Cities?.map((city, index) => (
              <div
                className={`${styles.city_wrapper}
                  `}
                key={index.toString()}
                onClick={() => {
                  handleCityChange(city?.list_value);
                }}>
                <img
                  src={cityUrl + city?.list_value_seourl + ".webp"}
                  className={`${styles.city_thambnil} ${
                    cityName === city?.list_value &&
                    "border-[2px] rounded-[6px] hover:rounded-[6px] border-primary"
                  }`}
                  alt={city?.list_value}
                  loading="lazy"
                />
                {city?.id === 50 ? (
                  <div className={`${styles.city_name}`}>
                    {city?.list_value.split("/")[0]}/
                    <br className="flex sm:hidden" />
                    {city?.list_value.split("/")[1]}
                  </div>
                ) : (
                  <p
                    className={`${
                      cityName === city?.list_value
                        ? "text-[#222] font-medium "
                        : "text-45454A"
                    } ${styles.city_name}`}>
                    {city?.list_value}
                  </p>
                )}
              </div>
            ))}
          </div>
          <div className={styles.bottom_city_content}>
            <p className={styles.bottom_subheading}>
              Get the free Cityfurnish app on your phone
            </p>
            <button className={styles.bottom_heading}>
              Download mobile app
            </button>
            <div className={styles.download_qr_wrapper}>
              <img
                src={
                  "https://d3juy0zp6vqec8.cloudfront.net/images/scan-and-download.webp"
                }
                alt="download-QR"
                loading="lazy"
              />
              {/* <Image src={Images.DownloadQR} alt="download-QR" /> */}
              <p className={styles.qr_text}>
                <span className={styles.qr_text_span}>100+</span>People have
                already downloaded our app 🎉
              </p>
            </div>
            <p className={styles.detail_line}>
              <span className="text-[#7895B0] font-bold">100k+ </span>&nbsp;
              People have already downloaded our app 🎉
            </p>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default CityDrawer;
