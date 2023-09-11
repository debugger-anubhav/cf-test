import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import styles from "./style.module.css";
import {MediaCoverageImages} from "@/constants/constant";
import string from "@/constants/Constant.json";
// import Image from "next/image";

const MediaCoverage = () => {
  const str = string.landing_page.Media_coverage;
  // const refs=useRef(null);
  // const parentRef=useRef(null);
  // const settings = {
  //   dots: false,
  //   arrows: false,
  //   infinite: true,
  //   speed: 100,
  //   autoplay: true,
  //   autoplaySpeed: 1000, // Adjust the time interval for the automatic slide
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1460,
  //       settings: {
  //         slidesToShow: 6,
  //       },
  //     },
  //     {
  //       breakpoint: 1260,
  //       settings: {
  //         slidesToShow: 5,
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 4,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 3,
  //       },
  //     },
  //   ],
  //   pauseOnHover: false,
  // };
  // h-full w-full

  // useEffect(() => {
  //   const mainDiv = refs.current;
  //   // const newDiv = document.createElement('div');
  //   // Check if the next sibling exists and is a div, and then insert the new div
  //   mainDiv.insertAdjacentHTML('afterend', parentRef.current.innerHTML);
  //   mainDiv.nextSibling.setAttribute('aria-hidden', 'true');
  // }, []);

  // const handleRef = (el )=> setLogos(refs.querySelectorAll('li'));
  return (
    <div className={styles.media_coverage_wrapper}>
      <p className={styles.label}>{str.label}</p>
      <h1 className={`${styles.heading} mb-8`}>{str.desc}</h1>

      <div className={`${styles.ticker_container} gap-12`}>
        {MediaCoverageImages?.map((imageUrl, index) => (
          <div
            key={index.toString()}
            className="!min-w-[124px] md:!min-w-[147px] lg:!min-w-max">
            <img
              src={imageUrl.img}
              alt={`Slide ${index} `}
              className="flex items-center w-full"
            />
          </div>
        ))}

        {/* {MediaCoverageImages?.map((imageUrl, index) => (
          <div key={index.toString()}>
            <img src={imageUrl.img} alt={`Slide ${index}`} className="" />
          </div>
        ))}
        {MediaCoverageImages?.map((imageUrl, index) => (
          <div key={index.toString()}>
            <img src={imageUrl.img} alt={`Slide ${index}`} className="" />
          </div>
        ))}
        {MediaCoverageImages?.map((imageUrl, index) => (
          <div key={index.toString()}>
            <img src={imageUrl.img} alt={`Slide ${index}`} className="" />
          </div>
        ))} */}
      </div>
      {/* <Slider {...settings} className={styles.carousel}>
        {MediaCoverageImages.map((imageUrl, index) => (
          <div key={index} className={styles.slide}>
            <img src={imageUrl.img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider> */}
    </div>
  );
};

export default MediaCoverage;
