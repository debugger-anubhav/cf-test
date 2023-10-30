import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import FAQQuestion from "@/components/ReferAFriend/MainSection/FAQQuestion";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";

export default function Vacancies() {
  const para =
    "Through constant learning, you will grow your career and the scope of your impact across industries. Our culture demands hard work and rewards it with exceptional opportunities. If you're looking for an opportunity to work in high- impact teams, where you can truly develop your skill set and knowledge and bring impact to the business, Cityfurnish is looking for you!";
  const [openIndex, setOpenIndex] = useState(0);
  const [vacaniesData, setVacaniesData] = useState(null);
  const toggleQuestion = index => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  const getData = () => {
    axios
      .get(baseURL + endPoints.careerPageData)
      .then(res => {
        console.log(res?.data?.data, "response");
        setVacaniesData(res?.data?.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getData();
    console.log(vacaniesData);
  }, []);

  return (
    <div className={styles.main_container}>
      <p className={styles.heading}>Vacancies</p>
      <p className={styles.para}>{para}</p>
      <div className={styles.QuesAnsArray_div}>
        {vacaniesData?.map((item, index) => {
          return (
            <div key={index.toString()}>
              <FAQQuestion
                ques={item?.Posting_Title}
                ans={item?.Job_Description}
                isOpen={index === openIndex}
                toggleQuestion={() => toggleQuestion(index)}
                applyBtn={true}
              />
              {index < vacaniesData?.length - 1 && (
                <div className="bg-EDEDEE h-[1px] w-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
