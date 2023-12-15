import React from "react";
import styles from "./style.module.css";
import {AboutUs} from "@/assets/images";
const data = {
  heading: "Life at CityFurnish",
  images: [
    {
      link1: `${AboutUs}/cityfurnish-culture-1.webp`,
      link2: `${AboutUs}/cityfurnish-culture-6.webp`,
      link3: `${AboutUs}/cityfurnish-culture-9.webp`,
      link4: `${AboutUs}/cityfurnish-culture-3.webp`,
      altText: "life at cityfurnish",
    },
    {
      link1: `${AboutUs}/cityfurnish-culture-7.webp`,
      link2: `${AboutUs}/cityfurnish-culture-5.webp`,
      // link3:`${AboutUs}/cityfurnish-culture-3.webp`
      link3: `${AboutUs}/cityfurnish-culture-2.webp`,
      link4: `${AboutUs}/cityfurnish-culture-4.webp`,
      link5: `${AboutUs}/cityfurnish-culture-8.webp`,
      altText: "life at cityfurnish",
    },
  ],
};

const CityFurnish = () => {
  //   const [isIndex, setIndex] = useState(1);
  return (
    <div className={styles.main_container}>
      <h2 className={styles.heading}>{data.heading}</h2>
      <div className={styles.images_wrapper}>
        {data.images?.map((ele, index) => {
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
