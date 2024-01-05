import React, {useState} from "react";
import styles from "./style.module.css";
import FAQQuestion from "@/components/ReferAFriend/MainSection/FAQQuestion";
import {FaAngleRight} from "react-icons/fa6";
import {ForwardArrowWithLineBold} from "../../../assets/icon";

function HaveQueries() {
  const [openIndex, setOpenIndex] = useState(0);

  const FAQ = [
    {
      question: "What is the minimum tenure for renting?",
      answer:
        "The minimum tenure is 3 Months. If your required period is not covered on our product page, we will be happy to discuss your requirement and fulfill the same.",
    },
    {
      question: "Is there a contract? What are the terms?",
      answer:
        "Yes, you are required to sign a contract at the time of delivery. The contract will include the basic terms of renting furniture in simple words. You can view sample of the same here.",
    },
  ];
  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading_container}>Have Queries?</h2>

      <div className={styles.QuesAnsArray_div}>
        {FAQ?.map((item, index) => {
          return (
            <div key={index.toString()}>
              <FAQQuestion
                ques={item?.question}
                ans={item?.answer}
                isOpen={index === openIndex}
                toggleQuestion={() => toggleQuestion(index)}
              />
              {index < FAQ?.length - 1 && (
                <div className="bg-EDEDEE h-[1px] w-full mb-6" />
              )}
            </div>
          );
        })}
      </div>
      <div>
        <a href="/pages/faq">
          <div className={styles.btn}>
            <p className={styles.btn_txt}>See more FAQs</p>
            {/* <ForwardArrow className={styles.forword_icon} /> */}
            <FaAngleRight className={`${styles.forword_icon} hidden md:flex`} />
            <ForwardArrowWithLineBold className={"flex md:hidden"} />
          </div>
        </a>
      </div>
    </div>
  );
}

export default HaveQueries;
