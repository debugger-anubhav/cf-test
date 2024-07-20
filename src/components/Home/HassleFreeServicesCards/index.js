import React, {memo} from "react";
import style from "./style.module.css";
import {HasselFreeData} from "@/constants/constant";
import Image from "@/components/Image";
import {ProductRowSkeleton} from "@/components/Common/ProductRowSkeleton";

const Title = "Truly hassle free service";

const HasselFreeServicesCards = () => {
  return HasselFreeData && HasselFreeData?.length > 0 ? (
    <div className={style.main_container}>
      <p className={style.heading}>{Title}</p>
      <div className="flex">
        <div className={style.card_container}>
          {HasselFreeData?.map((data, index) => {
            return (
              <div key={index.toString()}>
                <div
                  className={`${style.card_wrapper}  ${
                    index === HasselFreeData?.length - 1
                      ? "mr-[16px] lg:mr-0"
                      : ""
                  }`.trim()}>
                  <Image
                    src={data.backgroungImage}
                    alt={data?.Heading}
                    layout="fill"
                    className={`${style.card_wrapper} hidden xl:flex`}
                    objectPosition="center"
                  />
                  <Image
                    src={data.bgImgMobile}
                    alt={data?.Heading}
                    layout="fill"
                    className={`${style.card_wrapper} flex xl:hidden`}
                    objectPosition="center"
                  />
                  <div className={style.hassel_heading_wrapper}>
                    <p className={style.heading_text}>{data?.Heading}</p>
                    <p className={style.content}>{data?.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <ProductRowSkeleton />
  );
};

export default memo(HasselFreeServicesCards);
