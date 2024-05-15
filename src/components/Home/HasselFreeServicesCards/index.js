import React from "react";
import style from "./style.module.css";
import {HasselFreeData} from "@/constants/constant";
import Image from "next/image";

const HasselFreeServicesCards = () => {
  const Title = "Truly hassle free service";
  return (
    <div className={style.main_container}>
      <p className={style.heading}>{Title}</p>
      <div className="flex">
        <div className={style.card_container}>
          {HasselFreeData?.map((data, index) => {
            return (
              <div key={index.toString()}>
                <div
                  className={`${style.card_wrapper}  ${
                    index === HasselFreeData?.length - 1 && "mr-[16px] lg:mr-0"
                  }`}
                  // style={{
                  //   backgroundImage: `url("${data.backgroungImage}")`,
                  //   backgroundRepeat: "no-repeat",
                  //   backgroundSize: "cover",
                  // }}
                >
                  <Image
                    loader={({src}) => src}
                    src={data.backgroungImage}
                    alt={data?.Heading}
                    layout="fill"
                    className={`${style.card_wrapper} hidden xl:flex`}
                    // objectFit="cover"
                    objectPosition="center"
                  />
                  <Image
                    loader={({src}) => src}
                    src={data.bgImgMobile}
                    alt={data?.Heading}
                    layout="fill"
                    className={`${style.card_wrapper} flex xl:hidden`}
                    // objectFit="cover"
                    objectPosition="center"
                  />
                  <div className={style.hassel_heading_wrapper}>
                    <p className={style.heading_text}>{data?.Heading}</p>
                    <p className={style.content}>{data?.text}</p>
                  </div>
                </div>

                {/* <div
                  key={index.toString()}
                  className={`${style.card_wrapper} flex xl:hidden ${
                    index === HasselFreeData?.length - 1 && "mr-[16px] lg:mr-0"
                  }`}
                  // style={{
                  //   backgroundImage: `url("${data.bgImgMobile}")`,
                  //   backgroundRepeat: "no-repeat",
                  //   backgroundSize: "cover",
                  // }}
                  >
                  
                  <div className={style.hassel_heading_wrapper}>
                    <p className={style.heading_text}>{data?.Heading}</p>
                    <p className={style.content}>{data?.text}</p>
                  </div>
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HasselFreeServicesCards;
