import React, {useState} from "react";
import styles from "./style.module.css";
import FAQQuestion from "@/components/ReferAFriend/MainSection/FAQQuestion";

export default function Vacancies() {
  const para =
    "Through constant learning, you will grow your career and the scope of your impact across industries. Our culture demands hard work and rewards it with exceptional opportunities. If you're looking for an opportunity to work in high- impact teams, where you can truly develop your skill set and knowledge and bring impact to the business, Cityfurnish is looking for you!";
  const FAQ = [
    {
      id: 0,
      question: "Who Can Refer?",
      answer:
        "Only Cityfurnish customers can use referral program to refer their friends and family",
    },
    {
      id: 1,
      question: "How Can I Refer?",
      answer:
        "You can share your referral code on any social platform such as Facebook, Twitter etc from our Referral Page or you can even mail your link to your friends and family.",
    },
    {
      id: 2,
      question: "How Can I Use Referral Code?",
      answer:
        'If you have a referral code, please enter it in the "Referral Code" box while sign-up.',
    },
    {
      id: 3,
      question: "How Can I Claim The Referral Benefit?",
      answer:
        "The referrer gets a mail notification once their referral code is used by any of their friends. Contact our customer care via email or phone on receipt of notification to get applicable discount. Amount will be adjusted against remaining rental. No cashbacks are permitted against referral benifit.",
    },
    {
      id: 4,
      question: "Is There A Limit On Benefit?",
      answer:
        "- You can refer as many friends as you want. You get benefit on every successful conversion.<br/>- Referred customer can not club referral benefit with any other offer",
    },
    {
      id: 5,
      question: "Can I Use My Own Referral Code?",
      answer:
        "You can not use your own referral code. Cityfurnish reserves the right to revoke referral benefits availed by individuals who share a common address with the referrer",
    },
    {
      id: 6,
      question: "Other Terms And Conditions",
      answer:
        "- Referral program is not appliable on fitness equipments and office furniture. <br/> - Referrer should place an order of min 1000 Rs monthly rental to avail benefit of referral program.<br/>- Cityfurnish reserves the right to revoke referral benefits if they were earned against our terms or close the referral program anytime without any prior intimation",
    },
  ];
  const [openIndex, setOpenIndex] = useState(0);
  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className={styles.main_container}>
      <p className={styles.heading}>Vacancies</p>
      <p className={styles.para}>{para}</p>
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
                <div className="bg-EDEDEE h-[1px] w-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
