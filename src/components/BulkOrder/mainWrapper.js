import React from "react";
import style from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import NeedsSection from "./needsSection";
import EnquirySection from "./enquirySection";
import {AboutUs} from "@/assets/images";

const data = [
  `${AboutUs}/cityfurnish-culture-1.webp`,
  `${AboutUs}/cityfurnish-culture-6.webp`,
  `${AboutUs}/cityfurnish-culture-9.webp`,
  `${AboutUs}/cityfurnish-culture-3.webp`,
  `${AboutUs}/cityfurnish-culture-7.webp`,
  `${AboutUs}/cityfurnish-culture-5.webp`,
  `${AboutUs}/cityfurnish-culture-2.webp`,
  `${AboutUs}/cityfurnish-culture-4.webp`,
  `${AboutUs}/cityfurnish-culture-8.webp`,
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

      <div className="grid grid-cols-3 gap-4">
        {data?.map((ele, index) => {
          return (
            <div
              key={index}
              className={
                index === 0 || index === 6 || index === 7
                  ? "col-span-2"
                  : "col-span-1"
              }>
              <img
                alt={ele}
                className="w-full h-[300px] object-cover"
                src={ele}
                loading="lazy"></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainWrapper;
