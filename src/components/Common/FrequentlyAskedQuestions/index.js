import React, {memo, useEffect, useState} from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import SingleQuestion from "./singleQuestion";
import {ForwardArrow, DownArrowUnfilled} from "@/assets/icon";
import {Skeleton} from "@mui/material";
import Link from "next/link";
import {domain} from "../../../../appConfig";
import Worker from "worker-loader!./faqWorker.js";

const str = string.common_components.FAQ;

const FrequentlyAskedQuestions = ({params, isCitymax}) => {
  const [faqs, setFaqs] = useState(null);
  const [visibleQues, setVisibleQues] = useState(7);
  const [openIndex, setOpenIndex] = useState(null);

  const handleShowMore = () => {
    setVisibleQues(prevVisibleRows => prevVisibleRows + 5);
  };

  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  useEffect(() => {
    const worker = new Worker();

    worker.onmessage = function ({data: {data}}) {
      console.log("received", data);
      setFaqs(data);
    };

    worker.postMessage({params, domain});

    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div className={styles.freq_asked_que_wrapper}>
      <h2 className={styles.head}>{str.header}</h2>
      <div>
        <div className={styles.QuesAnsArray_div}>
          {faqs?.slice(0, visibleQues).map((item, index) => {
            return (
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
export default memo(FrequentlyAskedQuestions);

export const FaqsSkeleton = memo(() => {
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
});
