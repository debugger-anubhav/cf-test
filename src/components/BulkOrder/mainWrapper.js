import React from "react";
import style from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import NeedsSection from "./needsSection";
import EnquirySection from "./enquirySection";
import {AboutUs} from "@/assets/images";

const data = [
  `${AboutUs}/cp_7.webp`,
  `${AboutUs}/cp_3.webp`,
  `${AboutUs}/cp_1.webp`,
  `${AboutUs}/cp_8.webp`,
  `${AboutUs}/cp_6.webp`,
  `${AboutUs}/cp_9.webp`,
  `${AboutUs}/cp_2.webp`,
  `${AboutUs}/cp_4.webp`,
  `${AboutUs}/cp_5.webp`,
];

const MainWrapper = () => {
  return (
    <div className={style.conatiner_wrapper}>
      <div className={style.container}>
        <ul className={style.listings}>
          <li className={style.list}>
            <a href="/cityfurnish">
              <p className={`${style.route_text} cursor-pointer`}>Home</p>
            </a>
            <ForwardArrow size={12} color={"#71717A"} />
          </li>
          <li className={style.list}>
            <p className={`${style.route_text} !font-medium`}>
              CF for business
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h1 className={style.heading}>Corporate orders</h1>
        <p className={style.description}>
          If your home or business requirement calls for a bulk order,
          Cityfurnish offers turnkey services that cater to all needs: from
          setting up a new home, to furniture for your office or business
          venture.
        </p>
      </div>

      <div className={style.content_wrapper}>
        <div className={style.section1_wrapper}>
          <EnquirySection />
        </div>
        <div className={style.section2_wrapper}>
          <NeedsSection />
        </div>
      </div>

      <div>
        <p className={style.our_project_heading}>Our Projects</p>
        <div className={style.our_project_image_wrapper}>
          {data?.map((ele, index) => {
            return (
              <>
                <div
                  key={index.toString()}
                  className={`${
                    index === 0 || index === 6 || index === 7
                      ? "col-span-2"
                      : "col-span-1"
                  } ${style.our_project_web}`}>
                  <img
                    alt={ele}
                    className={style.our_project_image}
                    src={ele}
                    loading="lazy"></img>
                </div>
                <div
                  key={index}
                  className={`${
                    index === 2 || index === 3 || index === 8
                      ? "col-span-2"
                      : "col-span-1"
                  } ${style.our_project_mobile}`}>
                  <img
                    alt={ele}
                    className={style.our_project_image}
                    src={ele}
                    loading="lazy"></img>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
