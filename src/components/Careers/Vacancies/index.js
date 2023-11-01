import React, {useEffect, useState} from "react";
import styles from "./style.module.css";
import FAQQuestion from "@/components/ReferAFriend/MainSection/FAQQuestion";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {endPoints} from "@/network/endPoints";
import {Skeleton} from "@mui/material";

export default function Vacancies() {
  const para =
    "Through constant learning, you will grow your career and the scope of your impact across industries. Our culture demands hard work and rewards it with exceptional opportunities. If you're looking for an opportunity to work in high- impact teams, where you can truly develop your skill set and knowledge and bring impact to the business, Cityfurnish is looking for you!";
  const [openIndex, setOpenIndex] = useState(0);
  const [vacaniesData, setVacaniesData] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
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
        setLoadingSkeleton(false);
      })
      .catch(err => console.log(err));
  };
  const handleApply = index => {
    // router.push(`https://cityfurnish.zohorecruit.com/jobs/Careers/${vacaniesData[index]?.job_id}`)
    const url = `https://cityfurnish.zohorecruit.com/jobs/Careers/${vacaniesData[index]?.job_id}`;
    const newTab = window && window.open(url, "_blank");
    newTab.focus();
  };
  useEffect(() => {
    getData();
    console.log(vacaniesData);
  }, []);
  return (
    <div className={styles.main_container} id="vacancies-section">
      <p className={styles.heading}>Vacancies</p>
      <p className={styles.para}>{para}</p>
      <div>
        {loadingSkeleton ? (
          <VacanciesSkeleton />
        ) : (
          <div className={styles.QuesAnsArray_div}>
            {vacaniesData?.map((item, index) => {
              return (
                <div key={index.toString()}>
                  <FAQQuestion
                    ques={item?.job_title}
                    ans={item?.job_description}
                    isOpen={index === openIndex}
                    toggleQuestion={() => toggleQuestion(index)}
                    applyBtn={true}
                    applyClick={() => handleApply(index)}
                  />
                  {index < vacaniesData?.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export const VacanciesSkeleton = () => {
  return (
    <div className="my-10">
      {[1, 2, 3, 4]?.map(item => {
        return (
          <div key={item.toString()} className="my-4">
            <Skeleton
              variant="text"
              className={styles.skeleton_for_text}
              height={20}
            />
            {item < 4 && <div className={styles.skeleton_divider} />}
          </div>
        );
      })}
    </div>
  );
};
