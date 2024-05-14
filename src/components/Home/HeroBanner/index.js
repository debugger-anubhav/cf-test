"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {baseInstance} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {BASEURL} from "../../../../appConfig";
import {getLocalStorage} from "@/constants/constant";
import {Skeleton} from "@mui/material";

const HeroBanner = () => {
  const router = useRouter();
  const cityId = getLocalStorage("cityId");
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [setshowLinkForRentPage, setSetshowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );
  const [bannersData, setBannersData] = useState(null);
  const [loader, setLoader] = useState(true);

  const getBanners = () => {
    baseInstance
      .get(BASEURL + endPoints.getHomeBanners(cityId))
      .then(res => {
        setBannersData(res?.data?.data[0]);
        setLoader(false);
      })
      .catch(() => {
        setLoader(false);
      });
  };
  const handleRedirection = link => {
    if (setshowLinkForRentPage) {
      router.push(link);
    }
  };

  useEffect(() => {
    setSetshowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div>
      <div className={`${styles.hero_banner_wrapper} flex-col`}>
        {loader ? (
          <div className="lg:h-[600px] md:h-[350px] ms:h-[250px] h-[150px] w-full">
            <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
          </div>
        ) : (
          <>
            <div className="md:flex hidden w-full">
              <Carousel
                showStatus={false}
                showArrows={true}
                showThumbs={false}
                autoPlay
                infiniteLoop
                width={"100%"}
                swipeable>
                {bannersData &&
                  bannersData?.webImage?.map((item, index) => {
                    return (
                      <div
                        className="flex cursor-pointer"
                        key={index.toString()}
                        onClick={() => {
                          handleRedirection(item?.redirectionLink);
                        }}>
                        <img
                          src={item?.src}
                          alt={item?.alt}
                          width={926}
                          height={386}
                          className="cursor-pointer rounded-lg"
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>

            <div className="md:hidden flex w-full">
              <Carousel
                showStatus={false}
                showArrows={true}
                showThumbs={false}
                autoPlay
                infiniteLoop
                width={"100%"}
                swipeable>
                {bannersData &&
                  bannersData?.mobileImage?.map((item, index) => {
                    return (
                      <div
                        className="flex cursor-pointer"
                        key={index.toString()}
                        onClick={() => {
                          handleRedirection(item?.redirectionLink);
                        }}>
                        <img
                          src={item?.src}
                          alt={item?.alt}
                          width={"100%"}
                          height={"100%"}
                          className="cursor-pointer rounded-lg"
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default HeroBanner;
