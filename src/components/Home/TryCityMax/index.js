import React, {useState} from "react";
import styles from "./styles.module.css";
// import Image from "next/image";
import {ForwardArrow} from "@/assets/icon";
// import {TryCityMaxBannerMobile, TryCityMaxBannerWeb} from "@/assets/images";
import {Skeleton} from "@mui/material";
import CityMaxDrawer from "./cityMaxDrawer";
import {useSelector} from "react-redux";
// import SideDrawer from "./sideDrawer";
import Image from "@/components/Image/Image";

const TryCityMax = () => {
  const data = useSelector(state => state.contentful.tryCityData);
  const webImgUrl = data?.mediaData?.filter(e => e.tags.includes("web"))[0];
  const mobileImgUrl = data?.mediaData?.filter(e =>
    e.tags.includes("mobile"),
  )[0];
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const benefitsOfCity = [
    {
      id: 1,
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/quality-products.svg",
      title: "Quality products",
      paragraph:
        "Branded appliances and solid Sheesham Wood products in mint new condition",
    },
    {
      id: 2,
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/free-swap.svg",
      title: "Free Swap",
      paragraph:
        "Swap any product or design anytime during the subscription period",
    },
    {
      id: 3,
      title: "Cancel anytime",
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/cancel-anytime.svg",
      paragraph:
        "We will deduct 1 month's extra rent as a penalty and refund rest of the amount instantly",
    },
    {
      id: 4,
      img: "https://d3juy0zp6vqec8.cloudfront.net/images/icons/easy-on-wallet.svg",
      title: "Easy on Wallet",
      paragraph:
        "You can pay subscription fee in one go or opt for our no cost EMI plan",
    },
  ];

  const HandleToggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <>
      <div className={styles.main_wrapper}>
        <div className={styles.left_image_section}>
          {/* <Image
            loader={({src}) => src}
            src={TryCityMaxBannerWeb}
            alt="trycity"
            className={`hidden xl:flex ${styles.tryCity_image} `}
            width={589}
            height={720}
          /> */}
          <div className={`hidden xl:flex`}>
            <Image
              src={webImgUrl?.url}
              alt={data.altText}
              className="w-full object-contain"
            />
          </div>
          <div className="xl:hidden ">
            <Image
              src={mobileImgUrl?.url}
              alt={data.altText}
              className="w-full object-contain"
            />
          </div>

          {/* <Image
            loader={({src}) => src}
            src={TryCityMaxBannerMobile}
            alt="trycity"
            className={`xl:hidden ${styles.tryCity_image}`}
            width={589}
            height={720}
          /> */}
        </div>
        <div className={styles.right_text_section}>
          <h2 className={styles.tryCity_heading}>
            Try <span className={styles.tryCity_headingMax}>CityMax.</span>
          </h2>
          <p className={styles.TryCity_paragraph}>
            Unlimited furniture and appliances for
            <br /> lifetime. Starting at just{" "}
            <span className={styles.rupeeIcon}>₹</span>2,999/month.
          </p>
          <a
            href="/citymax"
            aria-label="Check our plans"
            target="_blank"
            rel="noreferrer">
            <div className={styles.check_button}>
              <p className={styles.check_button_paragraph}>Check our plans</p>
              <ForwardArrow
                size={20}
                color={"#222"}
                className={styles.forward_icon}
              />
            </div>
          </a>
          <div className={styles.benefits_of_city_wrapper}>
            <h2 className={styles.benefits_text}>Benefits of CityMax</h2>
            <hr className={styles.line} />
            <div className={styles.benefits_content}>
              {benefitsOfCity?.map((item, index) => {
                return (
                  <div className={styles.card_wrapper} key={index.toString()}>
                    <div className={`w-100 h-100 absolute z-10`} />
                    <Image
                      // loader={({src}) => src}
                      src={item?.img}
                      className={`${styles.card_icon} relative z-[-1]`}
                      alt="card-icon"
                      // loading="lazy"
                      // width={40}
                      // height={40}
                    />
                    <h3 className={styles.benefit_title}>{item?.title}</h3>
                    <p className={styles.benefit_paragraph}>
                      {item?.paragraph}
                    </p>
                  </div>
                );
              })}
            </div>
            <div>
              <button
                className={styles.how_it_works_button}
                onClick={HandleToggleDrawer}>
                <p className={styles.how_it_works_paragraph}>How it works</p>
                <ForwardArrow
                  size={18}
                  color={"#597492"}
                  className={styles.forward_arrow}
                />
              </button>
            </div>

            <CityMaxDrawer
              toggleDrawer={HandleToggleDrawer}
              open={isDrawerOpen}
            />

            {/* <SideDrawer /> */}
            <hr className={styles.underline} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TryCityMax;

export const TryCityMaxSkeleton = () => {
  return (
    <div className={styles.main_wrapper}>
      <div className="flex lg:hidden">
        <Skeleton variant="rectangular" width={"100%"} height={"300px"} />
      </div>
      <div className={styles.left_image_section}>
        <Skeleton
          variant="rectangular"
          className={styles.skeleton_box}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <div className={`${styles.right_text_section} h-full`}>
        <Skeleton
          variant="text"
          className={styles.Skeleton_text}
          width={"100%"}
          height={"100%"}
        />
        <Skeleton
          variant="text"
          className={`${styles.Skeleton_text} w-[80%] `}
          height={"100%"}
        />
        <Skeleton variant="text" className={styles.Skeleton_button} />
        <Skeleton
          variant="text"
          className={`${styles.Skeleton_text} mt-10 mb-4 hidden lg:block`}
          width={"140px"}
          height={"100%"}
        />
        <Skeleton
          variant="text"
          height={"0.5rem"}
          width={"100%"}
          className="hidden lg:block"
        />
        <div className=" lg:grid lg:grid-cols-2 flex w-full gap-4 mt-4 overflow-x-scroll">
          {[1, 2, 2, 2].map((i, index) => (
            <div className="h-[200px] min-w-[200px]" key={index.toString()}>
              <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
