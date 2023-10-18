import React, {useEffect, useRef, useState} from "react";
import style from "./style.module.css";
import {ForwardArrow} from "@/assets/icon";
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
import {FaHeadset, FaPhoneAlt} from "react-icons/fa";
import {BiArrowBack} from "react-icons/bi";

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
  const [openIndex, setOpenIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState();

  const sliderRef = useRef(null);

  useEffect(() => {
    const temp = [];
    if (searchKeyword) {
      General.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      HowItWorks.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      DeliveryAndInstalation.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      PaymentAndBilling.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      OurServices.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      WhyCityFurnish.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      ReferralProgram.forEach(ele => {
        if (ele?.que?.includes(searchKeyword)) {
          temp.push(ele);
        }
      });
      if (temp?.length) setFaqData(temp);
      else setFaqData([]);
    } else {
      setFaqData(General);
    }
  }, [searchKeyword]);

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
        <h1 className={style.heading}>
          {searchKeyword ? (
            <p
              className={style.searchHeading}
              onClick={() => {
                setSearchKeyword("");
                setValue(0);
                setFaqData(General);
              }}>
              <BiArrowBack
                size={24}
                color={"#222"}
                className="pointer-events-none pr-2"
              />
              FAQs
            </p>
          ) : (
            "FAQs"
          )}
        </h1>
      </div>

      <div className={style.open_searchbar_main}>
        <div className={style.search_wrapper}>
          <AiOutlineSearch
            size={24}
            color={"#71717A"}
            className="pointer-events-none"
          />
          <input
            placeholder="Search help in FAQs"
            className={style.search_input_field}
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      {!searchKeyword && (
        <>
          <div ref={sliderRef} className={style.tabs_wrapper}>
            {Data?.map((item, index) => {
              return (
                <div key={index} className={`${style.tab_wrapper}`}>
                  <div
                    className={`${style.tab_item} ${
                      value === index
                        ? "text-5774AC border-b-[1px] border-b-[#9A9AA2]"
                        : "text-45454A"
                    }`}
                    onClick={() => {
                      setValue(index);
                      setOpenIndex(0);
                    }}>
                    {item}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-b-[#EDEDEE] h-[1px]"></div>
        </>
      )}

      <div className={style.QuesAnsArray_div}>
        {faqData?.length ? (
          faqData?.map((item, index) => {
            return (
              <div key={index.toString()}>
                <SingleQuestion
                  item={item}
                  isOpen={index === openIndex}
                  toggleQuestion={() => toggleQuestion(index)}
                />
                {index < faqData?.length - 1 && (
                  <div className="bg-EDEDEE h-[1px] w-full" />
                )}
              </div>
            );
          })
        ) : (
          <p className={style.noDataText}>
            {`Uh-oh! It seems like we couldn't find any results for your search.`}
          </p>
        )}
      </div>

      <div className={style.bottom_button_wrapper}>
        <div className={style.bottom_heading}>Need to get in touch?</div>
        <div className={style.button_wrapper}>
          <a href="tel:080-66084700" target="_self" rel="noopener  noreferrer">
            <button className={style.contact_btn}>
              <FaPhoneAlt
                size={18}
                color={"#71717A"}
                className="pointer-events-none mr-[10px]"
              />
              080-66084700
            </button>
          </a>
          <button className={style.request_btn}>
            <FaHeadset
              size={18}
              color={"#222"}
              className="pointer-events-none mr-[10px]"
            />
            Raise a service request
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
