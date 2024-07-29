import React, { useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import { ForwardArrow } from "@/assets/icon";
import { AiOutlineSearch } from "react-icons/ai";
import {
  // General,
  DeliveryAndInstalation,
  HowItWorks,
  OurServices,
  PaymentAndBilling,
  ReferralProgram,
  WhyCityFurnish,
  RefundAndCancellation
} from "./data";
import SingleQuestion from "./singleQuestion";
import { FaHeadset, FaPhoneAlt } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import LoginModal from "@/components/LoginPopups";
import { useAuthentication } from "@/hooks/checkAuthentication";
import { useDispatch, useSelector } from "react-redux";
import { reduxSetModalState } from "@/store/Slices";
import { useRouter } from "next/navigation";

const Data = [
  // "General",
  "How it works",
  "Delivery & installation",
  "Payment and billing",
  "Our Services",
  "Why rent from Cityfurnish",
  "Referral Program",
  "Refund & Cancellation"
];

const MainWrapper = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { checkAuthentication } = useAuthentication();
  const reduxLoginState = useSelector(state => state.homePagedata.isLogin);
  const [value, setValue] = useState(0);
  const [isDumy, setIsDumy] = useState(false);
  const [openIndex, setOpenIndex] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [isLogin, setIsLogin] = useState();
  const [faqData, setFaqData] = useState([]);

  const dynamicData = {
    0: HowItWorks,
    1: DeliveryAndInstalation,
    2: PaymentAndBilling,
    3: OurServices,
    4: WhyCityFurnish,
    5: ReferralProgram,
    6: RefundAndCancellation
  };

  useEffect(() => {
    setIsLogin(reduxLoginState);
  }, [reduxLoginState]);

  const toggleLoginModal = bool => {
    dispatch(reduxSetModalState(bool));
    setLoginModal(bool);
  };

  const validateAuth = async () => {
    const isAuthenticated = await checkAuthentication();
    if (isAuthenticated === true) {
      setIsLogin(true);
    } else setIsLogin(false);
  };

  const sliderRef = useRef(null);

  useEffect(() => {
    const temp = [];
    if (searchKeyword?.trim()) {
      Object.values(dynamicData).forEach(dataArray => {
        dataArray.forEach(item => {
          const queContainsKeyword = item?.que
            ?.toLowerCase()
            .includes(searchKeyword.toLowerCase());
          const ansContainsKeyword = item?.ans
            ?.toLowerCase()
            .includes(searchKeyword.toLowerCase());
          const childresContainsKeyword =
            item?.isChildren?.filter(ele =>
              ele?.toLowerCase().includes(searchKeyword.toLowerCase()),
            )?.length > 0;

          if (
            queContainsKeyword ||
            ansContainsKeyword ||
            childresContainsKeyword
          ) {
            temp.push(item);
          }
        });
      });
      setFaqData([...temp]);
    } else setFaqData(dynamicData[value]);
  }, [searchKeyword, dynamicData, value]);

  useEffect(() => {
    setFaqData(dynamicData[value]);
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

  useEffect(() => {
    validateAuth();
  }, [isLogin]);

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className={style.conatiner_wrapper}>
      <LoginModal
        closeModal={() => toggleLoginModal(false)}
        isModalOpen={loginModal}
        setIsLogin={bool => setIsLogin(bool)}
      />
      <div className={style.container}>
        <ul className={style.listings}>
          <li className={style.list}>
            <a href="/">
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
        <h1 className={`${style.heading} !pt-0 md:!pt-4`}>
          {searchKeyword ? (
            <div
              className={style.searchHeading}
              onClick={() => {
                setSearchKeyword("");
                setValue(0);
                // setFaqData(General);
                setFaqData(HowItWorks);
              }}>
              <BiArrowBack
                size={24}
                color={"#222"}
                className="pointer-events-none pr-2"
              />
              FAQs
            </div>
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
            onChange={e => setSearchKeyword(e.target.value.toLowerCase())}
          />
        </div>
      </div>
      {!searchKeyword && (
        <div>
          <div ref={sliderRef} className={style.tabs_wrapper}>
            {Data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`${style.tab_wrapper} border-b-[1px] border-b-[#EDEDEE]`}>
                  <div
                    className={`${style.tab_item} ${value === index
                      ? "text-5774AC border-b-[1px] border-b-[#9A9AA2]"
                      : "text-45454A"
                      }
                    ${index !== Data.length - 1 ? "mr-4 md:mr-6" : "mr-0"}
                    `}
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
        </div>
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
        <h2 className={style.bottom_heading}>Need to get in touch?</h2>
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
          <button
            className={style.request_btn}
            onClick={() =>
              isLogin
                ? router.push("/service-requests")
                : toggleLoginModal(true)
            }>
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
