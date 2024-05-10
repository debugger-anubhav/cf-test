import React from "react";
import {FaPhoneAlt} from "react-icons/fa";
import style from "./style.module.css";
import {AboutUs} from "@/assets/images";

const data = [
  {
    title: "Hospitality",
    desc: "Furniture for Hotels and Restaurants",
    img: `${AboutUs}/co_living_co_working.webp`,
  },
  {
    title: "Office",
    desc: "Office Furniture & Other Equipments",
    img: `${AboutUs}/office.webp`,
  },
  {
    title: "Co-living & co-working",
    desc: "Furniture for Co-work & Co- living",
    img: `${AboutUs}/hospitality.webp`,
  },
];

const NeedsSection = () => {
  return (
    <div>
      <div className={style.need_heading}>
        Fulfilling all your corporate needs
      </div>

      <div className="flex w-full">
        <div className=" grid grid-cols-3 md:grid-cols-2 w-full gap-4">
          {data?.map((ele, idx) => {
            return (
              <div key={idx} className="">
                <img
                  src={ele?.img}
                  alt={ele?.title}
                  className={"w-full "}
                  loading="lazy"
                />
                <div className={style.need_img_title}>{ele?.title}</div>
                <div className={style.need_img_desc}>{ele?.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="md:mt-12 mt-9">
        <div className={style.custom_heading}>Custom Made Products</div>
        <p className={style.custom_desc}>
          Need something unique? We will make it for you. We provide custom made
          furniture as per the demand of your project
        </p>
        <a href="tel:080-66084700" target="_blank" rel="noopener  noreferrer">
          <button className={style.contact_btn}>
            <FaPhoneAlt
              size={18}
              color={"#71717A"}
              className="pointer-events-none mr-[10px]"
            />
            080-66084700
          </button>
        </a>
      </div>
    </div>
  );
};

export default NeedsSection;
