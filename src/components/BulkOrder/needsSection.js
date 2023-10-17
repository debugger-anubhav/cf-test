import React from "react";
import {FaPhoneAlt} from "react-icons/fa";
import style from "./style.module.css";
import {AboutUs} from "@/assets/images";

const data = [
  {
    title: "Hospitality",
    desc: "Furniture for Hotels and Restaurants",
    img: `${AboutUs}/cityfurnish-culture-1.webp`,
  },
  {
    title: "Office",
    desc: "Office Furniture & Other Equipments",
    img: `${AboutUs}/cityfurnish-culture-2.webp`,
  },
  {
    title: "Co-living & co-working",
    desc: "Furniture for Co-work & Co- living",
    img: `${AboutUs}/cityfurnish-culture-3.webp`,
  },
];

const NeedsSection = () => {
  return (
    <>
      <div>Fulfilling all your corporate needs</div>

      <div className="grid grid-cols-2 gap-4">
        {data?.map((ele, idx) => {
          return (
            <div key={idx}>
              <img src={ele?.img} alt={ele?.title} />
              <div>{ele?.title}</div>
              <div>{ele?.desc}</div>
            </div>
          );
        })}
      </div>

      <div>
        <div>Custom Made Products</div>
        <p>
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
    </>
  );
};

export default NeedsSection;
