import React from "react";
import styles from "./style.module.css";
import strings from "@/constants/Constant.json";
import {Newlylaunched} from "@/constants/constant";
import Image from "next/image";

const NewlyLaunched = () => {
  const heading = strings.landing_page.Newlylaunced.heading;
  const subHeading = strings.landing_page.Newlylaunced.productRent;
  return (
    <div className={styles.main_container}>
      {/* <div className={styles.brown_box}>
                <h2 className={styles.heading}>{heading}</h2>
                <h3 className={styles.subHeading}>{subHeading}</h3>
            </div> */}
      <div className="flex overflow-x-scroll">
        {Newlylaunched.map((ele, index) => (
          <div key={index}>
            <div className="flex mr-4">
              {index === 0 ? (
                <div className={styles.brown_box}>
                  <h2 className={styles.heading}>{heading}</h2>
                  <h3 className={styles.subHeading}>{subHeading}</h3>
                </div>
              ) : (
                <div className="!relative">
                  <div className="">
                    <Image
                      src={ele.img}
                      width={241}
                      height={181}
                      className="!max-w-[241px] !max-h-[181px]"
                    />
                  </div>
                  <div className={styles.price_tag}>
                    <p>{ele.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewlyLaunched;