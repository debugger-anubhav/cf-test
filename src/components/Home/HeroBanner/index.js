"use client";
import React, {useEffect, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
import styles from "./style.module.css";
import {useSelector} from "react-redux";
import {useRouter} from "next/navigation";
import {Skeleton} from "@mui/material";
import Image from "next/image";

const HeroBanner = () => {
  const router = useRouter();
  const homePageReduxData = useSelector(state => state.homePagedata);
  const [showLinkForRentPage, setShowLinkForRentPage] = useState(
    homePageReduxData.showAllRentLink,
  );

  const bannersData = [
    {
      images: [
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp",
          alt: "bed-room",
          redirectionLink:
            "https://cityfurnish.com/bangalore/home-furniture-rental",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp",
          alt: "appliances",
          redirectionLink:
            "https://cityfurnish.com/bangalore/home-appliances-rental",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp",
          alt: "citymax",
          redirectionLink: "https://cityfurnish.com/citymax",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp",
          alt: "discount-deals",
          redirectionLink: "https://cityfurnish.com/bangalore/discount-deals",
        },
      ],
    },
    {
      images: [
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_1.webp",
          alt: "bed-room",
          redirectionLink:
            "https://cityfurnish.com/bangalore/home-furniture-rental",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_2.webp",
          alt: "appliances",
          redirectionLink:
            "https://cityfurnish.com/bangalore/home-appliances-rental",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_3.webp",
          alt: "citymax",
          redirectionLink: "https://cityfurnish.com/citymax",
        },
        {
          src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_4.webp",
          alt: "discount-deals",
          redirectionLink: "https://cityfurnish.com/bangalore/discount-deals",
        },
      ],
    },
  ];

  const handleRedirection = link => {
    if (showLinkForRentPage) {
      router.push(link);
    }
  };

  useEffect(() => {
    setShowLinkForRentPage(homePageReduxData.showAllRentLink);
  }, [homePageReduxData.showAllRentLink]);

  return (
    <div
      className={`${styles.hero_banner_wrapper} flex-col lg:min-h-[385px] min-h-[125px]`}>
      <div className="w-full hidden md:flex">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {bannersData[0].images.map((item, index) => (
            <div key={index}>
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  handleRedirection(item.redirectionLink);
                }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  className="cursor-pointer rounded-lg"
                  width={768}
                  height={385}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className="w-full md:hidden">
        <Carousel
          showStatus={false}
          showArrows={true}
          showThumbs={false}
          autoPlay
          infiniteLoop
          width={"100%"}
          swipeable>
          {bannersData[1].images.map((item, index) => (
            <div key={index}>
              <div
                className="flex cursor-pointer"
                onClick={() => {
                  handleRedirection(item.redirectionLink);
                }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={450}
                  height={125}
                  className="cursor-pointer rounded-lg"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroBanner;

export const HeroBannerSkeleton = () => {
  return (
    <div className="lg:h-[600px] md:h-[350px] ms:h-[250px] h-[150px] w-full">
      <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
    </div>
  );
};

// "use client";
// import React, {useEffect, useState} from "react";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {Carousel} from "react-responsive-carousel";
// import styles from "./style.module.css";
// import {useSelector} from "react-redux";
// import {useRouter} from "next/navigation";
// // import {baseInstance} from "@/network/axios";
// // import {endPoints} from "@/network/endPoints";
// // import {BASEURL} from "../../../../appConfig";
// // import {getLocalStorage} from "@/constants/constant";
// import {Skeleton} from "@mui/material";

// const HeroBanner = () => {
//   const router = useRouter();
//   // const cityId = getLocalStorage("cityId");
//   const homePageReduxData = useSelector(state => state.homePagedata);
//   const [setshowLinkForRentPage, setSetshowLinkForRentPage] = useState(
//     homePageReduxData.showAllRentLink,
//   );
//   // const [bannersData, setBannersData] = useState(null);
//   // const [loader, setLoader] = useState(true);
//   const bannersData = [
//     {
//       webImage: [
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_11.webp",
//           alt: "bed-room",
//           redirectionLink:
//             "https://cityfurnish.com/bangalore/home-furniture-rental",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_12.webp",
//           alt: "appliances",
//           redirectionLink:
//             "https://cityfurnish.com/bangalore/home-appliances-rental",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_2.webp",
//           alt: "citymax",
//           redirectionLink: "https://cityfurnish.com/citymax",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_rt_banner_13.webp",
//           alt: "discount-deals",
//           redirectionLink: "https://cityfurnish.com/bangalore/discount-deals",
//         },
//       ],
//       mobileImage: [
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_1.webp",
//           alt: "bed-room",
//           redirectionLink:
//             "https://cityfurnish.com/bangalore/home-furniture-rental",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_2.webp",
//           alt: "appliances",
//           redirectionLink:
//             "https://cityfurnish.com/bangalore/home-appliances-rental",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_3.webp",
//           alt: "citymax",
//           redirectionLink: "https://cityfurnish.com/citymax",
//         },
//         {
//           src: "https://d3juy0zp6vqec8.cloudfront.net/images/new_mob_banner_4.webp",
//           alt: "discount-deals",
//           redirectionLink: "https://cityfurnish.com/bangalore/discount-deals",
//         },
//       ],
//     },
//   ];

//   // const getBanners = () => {
//   //   baseInstance.get(BASEURL + endPoints.getHomeBanners(cityId)).then(res => {
//   //     setBannersData(res?.data?.data[0]);
//   //     // setLoader(false);
//   //   });
//   //   // .catch(() => {
//   //   //   setLoader(false);
//   //   // });
//   // };
//   const handleRedirection = link => {
//     if (setshowLinkForRentPage) {
//       router.push(link);
//     }
//   };

//   useEffect(() => {
//     setSetshowLinkForRentPage(homePageReduxData.showAllRentLink);
//   }, [homePageReduxData.showAllRentLink]);

//   // useEffect(() => {
//   //   getBanners();
//   // }, []);

//   return (
//     <div>
//       <div className={`${styles.hero_banner_wrapper} flex-col`}>
//         {/* {loader ? (
//           <HeroBannerSkeleton/>
//         ) : ( */}
//         <>
//           <div className="md:flex hidden w-full">
//             <Carousel
//               showStatus={false}
//               showArrows={true}
//               showThumbs={false}
//               autoPlay
//               infiniteLoop
//               width={"100%"}
//               swipeable>
//               {bannersData &&
//                 bannersData[0]?.webImage?.map((item, index) => {
//                   return (
//                     <div
//                       className="flex cursor-pointer"
//                       key={index.toString()}
//                       onClick={() => {
//                         handleRedirection(item?.redirectionLink);
//                       }}>
//                       <img
//                         src={item?.src}
//                         alt={item?.alt}
//                         width={926}
//                         height={386}
//                         className="cursor-pointer rounded-lg"
//                       />
//                     </div>
//                   );
//                 })}
//             </Carousel>
//           </div>

//           <div className="md:hidden flex w-full">
//             <Carousel
//               showStatus={false}
//               showArrows={true}
//               showThumbs={false}
//               autoPlay
//               infiniteLoop
//               width={"100%"}
//               swipeable>
//               {bannersData &&
//                 bannersData[0]?.mobileImage?.map((item, index) => {
//                   return (
//                     <div
//                       className="flex cursor-pointer"
//                       key={index.toString()}
//                       onClick={() => {
//                         handleRedirection(item?.redirectionLink);
//                       }}>
//                       <img
//                         src={item?.src}
//                         alt={item?.alt}
//                         width={"100%"}
//                         height={"100%"}
//                         className="cursor-pointer rounded-lg"
//                       />
//                     </div>
//                   );
//                 })}
//             </Carousel>
//           </div>
//         </>
//         {/* )} */}
//       </div>
//     </div>
//   );
// };
// export default HeroBanner;

// export const HeroBannerSkeleton = () => {
//   return (
//     <div className="lg:h-[600px] md:h-[350px] ms:h-[250px] h-[150px] w-full">
//       <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
//     </div>
//   );
// };
