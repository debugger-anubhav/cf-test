import React, {useEffect, useRef, useState} from "react";
import style from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
import {Button} from "@mui/material";
import {AiOutlineSearch} from "react-icons/ai";
import {
  General,
  DeliveryAndInstalation,
  HowItWorks,
  OurServices,
  PaymentAndBilling,
  ReferralProgram,
  WhyCityFurnish,
} from "./data";
import SingleQuestion from "./singleQuestion";
import {FaPhoneAlt} from "react-icons/fa";

const Data = [
  "General",
  "How it works",
  "Delivery & installation",
  "Payment and billing",
  "Our Services",
  "Why rent from Cityfurnish",
  "Referral Program",
];

const MainWrapper = () => {
  const [value, setValue] = useState(0);
  const [isDumy, setIsDumy] = useState(false);
  const [faqData, setFaqData] = useState();
  const [openIndex, setOpenIndex] = useState();

  const sliderRef = useRef(null);

  useEffect(() => {
    if (value === 0) {
      setFaqData(General);
    } else if (value === 1) {
      setFaqData(HowItWorks);
    } else if (value === 2) {
      setFaqData(DeliveryAndInstalation);
    } else if (value === 3) {
      setFaqData(PaymentAndBilling);
    } else if (value === 4) {
      setFaqData(OurServices);
    } else if (value === 5) {
      setFaqData(WhyCityFurnish);
    } else if (value === 6) {
      setFaqData(ReferralProgram);
    }
    setOpenIndex();
  }, [value]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = e => {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    const stopDragging = () => {
      setIsDumy(false);
      mouseDown = false;
    };

    const toggleIsdragging = () => {
      if (mouseDown && !isDumy) setIsDumy(true);
    };

    slider.addEventListener("mousemove", e => {
      e.preventDefault();
      if (!mouseDown) return;
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);
    slider.addEventListener("mousemove", toggleIsdragging);

    return () => {
      slider.removeEventListener("mousedown", startDragging);
      slider.removeEventListener("mouseup", stopDragging);
      slider.removeEventListener("mouseleave", stopDragging);
      slider.removeEventListener("mousemove", toggleIsdragging);
    };
  }, []);

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

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
            <p className={`${style.route_text} !font-medium`}>FAQs</p>
          </li>
        </ul>
      </div>

      <div>
        <h1 className={style.heading}>FAQs</h1>
      </div>

      <div className={style.open_searchbar_main}>
        <div className={style.search_container}>
          <AiOutlineSearch
            size={24}
            color={"#71717A"}
            className="pointer-events-none"
          />
          <input
            placeholder="Search help in FAQs"
            className={style.search_input_field}
          />
        </div>
      </div>

      <div ref={sliderRef} className={style.tabs_wrapper}>
        {Data?.map((item, index) => {
          return (
            <div
              key={index}
              className={`${style.tab_wrapper} ${
                value === index ? "border-b-[#9A9AA2]" : "border-b-[#EDEDEE]"
              }`}>
              <div
                className={`${style.tab_item} ${
                  value === index ? "text-5774AC" : "text-45454A"
                }`}
                onClick={() => setValue(index)}>
                {item}
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.QuesAnsArray_div}>
        {faqData?.map((item, index) => {
          return (
            <div key={index.toString()}>
              <SingleQuestion
                ques={item?.que}
                ans={item?.ans}
                isOpen={index === openIndex}
                toggleQuestion={() => toggleQuestion(index)}
              />
              {index < faqData?.length - 1 && (
                <div className="bg-EDEDEE h-[1px] w-full" />
              )}
            </div>
          );
        })}
      </div>

      <div className={style.bottom_button_wrapper}>
        <div className={style.bottom_heading}>Need to get in touch?</div>
        <div className={style.button_wrapper}>
          <Button variant="outlined" className={style.contact_btn}>
            <FaPhoneAlt
              size={18}
              color={"#71717A"}
              className="pointer-events-none"
            />
            080-66084700
          </Button>
          <Button variant="contained" className={style.request_btn}>
            Raise a service request
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
