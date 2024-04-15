import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import SingleQuestion from "./singleQuestion";
import {ForwardArrow, DownArrowUnfilled} from "@/assets/icon";
import {useQuery} from "@/hooks/useQuery";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";
import Link from "next/link";
import {baseInstance} from "@/network/axios";

// h2 h3 p

const FrequentlyAskedQuestions = ({params, isCitymax}) => {
  const str = string.common_components.FAQ;
  const [faqs, setFaqs] = React.useState(null);
  const [visibleQues, setVisibleQues] = useState(7);

  const handleShowMore = () => {
    setVisibleQues(prevVisibleRows => prevVisibleRows + 5);
  };
  const [openIndex, setOpenIndex] = React.useState(null);
  const {refetch: getFaqsLandingPage} = useQuery(
    "faqsLandingPage",
    endPoints.faqsLandingPage,
  );
  const {refetch: getFaqsSeoAppliancePage} = useQuery(
    "faqsSeoAppliancePage",
    endPoints.seoApplianceFaqs,
  );
  const {refetch: getFaqsSeoFurniturePage} = useQuery(
    "faqsSeoFurniturePage",
    endPoints.seoFurnitureFaqs,
  );
  const {refetch: getFaqsCategory} = useQuery(
    "faqsCategoryPage",
    endPoints.categortFaq,
    `?parentCategoryId=27`,
  );
  const getFaqsCitymax = () => {
    baseInstance
      .get("http://43.205.53.146/ajxapi/frp_faq_details")
      // .get("https://test.rentofurniture.com/ajxapi/frp_faq_details")
      .then(res => {
        setFaqs(res?.data?.data?.content);
        console.log(res?.data?.data?.content, ";;;;;;;;;;");
      })
      .catch(err => console.log(err?.message || "some error"));
  };

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    if (params?.category === "appliances-rental") {
      getFaqsSeoAppliancePage()
        .then(res => {
          setFaqs(res?.data?.data);
          // console.log("appliances-rental")
        })
        .catch(err => console.log(err?.message || "some error"));
    } else if (params?.category === "furniture-rental") {
      getFaqsSeoFurniturePage()
        .then(res => {
          setFaqs(res?.data?.data);
          // console.log("furniture-rental")
        })
        .catch(err => console.log(err?.message || "some error"));
    } else if (params === "category") {
      getFaqsCategory()
        .then(res => {
          setFaqs(res?.data?.data);
        })
        .catch(err => console.log(err?.message || "some error"));
    } else if (params === "citymax") {
      getFaqsCitymax();
    } else {
      getFaqsLandingPage()
        .then(res => {
          setFaqs(res?.data?.data);
          // console.log(res?.data?.data,"[[[[[[")
          // console.log("home")
        })
        .catch(err => console.log(err?.message || "some error"));
    }
  }, []);

  return (
    <div className={styles.freq_asked_que_wrapper}>
      <h2 className={styles.head}>{str.header}</h2>
      <div>
        <div className={styles.QuesAnsArray_div}>
          {faqs?.slice(0, visibleQues).map((item, index) => {
            return (
              // index < 7 && (
              <div key={index.toString()}>
                <SingleQuestion
                  ques={item?.question}
                  ans={item?.answer}
                  isOpen={index === openIndex}
                  toggleQuestion={() => toggleQuestion(index)}
                />
                {index !== faqs.slice(0, visibleQues).length - 1 && (
                  <div className="bg-EDEDEE h-[1px] w-full" />
                )}
              </div>
            );
            // );
          })}
        </div>

        {isCitymax ? (
          visibleQues < faqs?.length && (
            <button className={styles.show_more_div} onClick={handleShowMore}>
              See More FAQs
              <DownArrowUnfilled className={styles.down_arrow} />
            </button>
          )
        ) : (
          <Link href="/pages/faq">
            <div className={styles.btn}>
              <p className={styles.btn_txt}>{str.btn_txt}</p>
              <ForwardArrow className={styles.forword_icon} />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
export default FrequentlyAskedQuestions;

export const FaqsSkeleton = () => {
  return (
    <div className={styles.faq_skeleton_wrapper}>
      <div className="w-[30%] h-8">
        <Skeleton variant="text" className={"text-16 w-full h-full"} />
      </div>
      <div className="w-[45%]">
        <div className={styles.QuesAnsArray_div}>
          {[1, 2, 3, 4, 5]?.map((item, index) => {
            return (
              <div key={index.toString()}>
                <Skeleton variant="text" className={"text-16 w-full"} />
              </div>
            );
          })}
        </div>
        <Skeleton variant="text" className={"w-40 h-20 mt-2"} height={80} />
      </div>
    </div>
  );
};
