import React, {useEffect, useState} from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import styles from "@/components/Common/Drawer/style.module.css";
import {Close} from "@/assets/icon";
import {cityUrl} from "../../../../appConfig";
import customStyles from "./styles.module.css";
import Image from "next/image";

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

  useEffect(() => {
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
                    cityName === city?.list_value
                      ? "border-[2px] rounded-[6px] hover:rounded-[6px] border-primary"
                      : ""
                  }`.trim()}
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
                    } ${styles.city_name}`.trim()}>
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
              <div className={`${styles.qr_text}`}>
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
              <p>People have already downloaded our app </p>
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
    </SwipeableDrawer>
  );
};

export default CityDrawer;
