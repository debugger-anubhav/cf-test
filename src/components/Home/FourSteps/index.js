import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import {FourStepsCardData} from "@/constants/constant";
import Image from "@/components/Image/Image";

// h2 p h3 p

const FourSteps = ({data}) => {
  return (
    <div className={styles.four_steps_wrapper}>
      <h2 className={styles.head}>{string.landing_page.Four_steps.heading}</h2>
      <p className={styles.subhead}>{string.landing_page.Four_steps.subhead}</p>
      <div className={styles.card_wrapper}>
        {data?.mediaData?.map((itemm, index) => {
          return (
            <div key={index.toString()} className={styles.card}>
              <div>
                <div className={`w-100 h-100 absolute z-10`} />
                <Image
                  src={itemm?.url}
                  alt={data?.altText + index}
                  className={`${
                    index === 0
                      ? "max-w-[80px]"
                      : index === 1
                      ? "max-w-[85px] "
                      : index === 2
                      ? "max-w-[137px] "
                      : "max-w-[100px] "
                  } !max-h-[100px] !h-[100px]`}
                />
              </div>
              {FourStepsCardData?.map((ele, i) => {
                return (
                  <div key={i.toString}>
                    {index === i && (
                      <>
                        <h3 className={styles.head1}>{ele?.head}</h3>
                        <p className={styles.content1}>{ele?.content}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* {FourStepsCardData?.map((itemm, index) => (
          <div key={index.toString()} className={styles.card}>
            <div>
              <div className={`w-100 h-100 absolute z-10`} />
              <Image
                loader={({src}) => src}
                src={itemm?.img1}
                alt={`step-${index + 1}`}
                loading="lazy"
                className={`${
                  index === 0
                    ? "w-[80px] h-[80px]"
                    : index === 1
                    ? "w-[85px] h-[80px]"
                    : index === 2
                    ? "w-[137px] h-[73.5px]"
                    : "w-[161px] h-[70px]"
                } md:flex hidden relative z-[-1]`}
                width={81}
                height={81}
              />
              <Image
                loader={({src}) => src}
                src={itemm?.img2}
                className={`min-w-[160px] h-[160px] flex md:hidden relative z-[-1]`}
                loading="lazy"
                height={172}
                width={172}
                alt={`step-${index + 1}`}
              />
            </div>
            <h3 className={styles.head1}>{itemm?.head}</h3>
            <p className={styles.content1}>{itemm?.content}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};
export default FourSteps;
