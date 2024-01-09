import React from "react";
import styles from "./style.module.css";
import {AboutUs} from "@/assets/images";
const data = {
  heading: "Life at CityFurnish",
  images: [
    {
      link1: `${AboutUs}/cityfurnish-culture-dt-2.webp`,
      link2: `${AboutUs}/cityfurnish-culture-dt-5.webp`,
      link3: `${AboutUs}/cityfurnish-culture-dt-8.webp`,
      link4: `${AboutUs}/cityfurnish-culture-dt-1.webp`,
      altText: "life at cityfurnish",
    },
    {
      link1: `${AboutUs}/cityfurnish-culture-dt-6.webp`,
      link2: `${AboutUs}/cityfurnish-culture-dt-7.webp`,
      link3: `${AboutUs}/cityfurnish-culture-dt-3.webp`,
      link4: `${AboutUs}/cityfurnish-culture-dt-9.webp`,
      link5: `${AboutUs}/cityfurnish-culture-dt-4.webp`,
      altText: "life at cityfurnish",
    },
  ],
  imagesForMobile: [
    {
      link1: `${AboutUs}/cityfurnish-culture-mob-2.webp`,
      link2: `${AboutUs}/cityfurnish-culture-mob-5.webp`,
      link3: `${AboutUs}/cityfurnish-culture-mob-8.webp`,
      link4: `${AboutUs}/cityfurnish-culture-mob-1.webp`,
      altText: "life at cityfurnish",
    },
    {
      link1: `${AboutUs}/cityfurnish-culture-mob-6.webp`,
      link2: `${AboutUs}/cityfurnish-culture-mob-7.webp`,
      link3: `${AboutUs}/cityfurnish-culture-mob-3.webp`,
      link4: `${AboutUs}/cityfurnish-culture-mob-9.webp`,
      link5: `${AboutUs}/cityfurnish-culture-mob-4.webp`,
      altText: "life at cityfurnish",
    },
  ],
};

const CityFurnish = () => {
  //   const [isIndex, setIndex] = useState(1);
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>{data.heading}</h2>
      {/* <div className={styles.images_wrapper}> */}
      <div className={"hidden md:flex md:flex-row  md:gap-4"}>
        {data.images.map((ele, index) => {
          return (
            <div className={styles.image_container} key={index.toString()}>
              <div className={styles.small_images}>
                <div className={styles.img_box}>
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link1}
                    loading="lazy"></img>
                </div>
                <div className={styles.img_box}>
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link2}
                    loading="lazy"></img>
                </div>
              </div>
              <div className={`${index === 1 ? "" : styles.large_img}`}>
                {index === 1 ? (
                  <div className={styles.small_images}>
                    <div className={styles.img_box}>
                      <img
                        alt={ele.altText}
                        className={styles.img_cls}
                        src={ele.link3}
                        loading="lazy"></img>
                    </div>
                    <div className={styles.img_box}>
                      <img
                        alt={ele.altText}
                        className={styles.img_cls}
                        src={ele.link4}
                        loading="lazy"></img>
                    </div>
                  </div>
                ) : (
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link3}
                    loading="lazy"
                  />
                )}
              </div>
              <div className={styles.large_img}>
                {index === 1 ? (
                  <img
                    className={styles.img_cls}
                    src={ele.link5}
                    alt={ele.altText}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className={styles.img_cls}
                    src={ele.link4}
                    alt={ele.altText}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className={"flex  flex-col gap-[9px]  md:hidden"}>
        {data.imagesForMobile.map((ele, index) => {
          return (
            <div className={styles.image_container} key={index.toString()}>
              <div className={styles.small_images}>
                <div className={styles.img_box}>
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link1}
                    loading="lazy"></img>
                </div>
                <div className={styles.img_box}>
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link2}
                    loading="lazy"></img>
                </div>
              </div>
              <div className={`${index === 1 ? "" : styles.large_img}`}>
                {index === 1 ? (
                  <div className={styles.small_images}>
                    <div className={styles.img_box}>
                      <img
                        alt={ele.altText}
                        className={styles.img_cls}
                        src={ele.link3}
                        loading="lazy"></img>
                    </div>
                    <div className={styles.img_box}>
                      <img
                        alt={ele.altText}
                        className={styles.img_cls}
                        src={ele.link4}
                        loading="lazy"></img>
                    </div>
                  </div>
                ) : (
                  <img
                    alt={ele.altText}
                    className={styles.img_cls}
                    src={ele.link3}
                    loading="lazy"
                  />
                )}
              </div>
              <div className={styles.large_img}>
                {index === 1 ? (
                  <img
                    className={styles.img_cls}
                    src={ele.link5}
                    alt={ele.altText}
                    loading="lazy"
                  />
                ) : (
                  <img
                    className={styles.img_cls}
                    src={ele.link4}
                    alt={ele.altText}
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CityFurnish;
