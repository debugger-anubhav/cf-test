import React from "react";
import styles from "./style.module.css";
import string from "@/constants/Constant.json";
import SingleQuestion from "./singleQuestion";
import {ForwardArrow} from "@/assets/icon";

// h2 h3 p

const FrequentlyAskedQuestions = () => {
  const str = string.common_components.FAQ;
  return (
    <div className={styles.freq_asked_que_wrapper}>
      <h2 className={styles.head}>{str.header}</h2>
      <div>
        <div className={styles.QuesAnsArray_div}>
          {str.QuesAnsArray?.map((item, index) => (
            <div key={index.toString()}>
              <SingleQuestion ques={item?.ques} ans={item?.ans} />
            </div>
          ))}
        </div>
        <div className={styles.btn}>
          <p className={styles.btn_txt}>{str.btn_txt}</p>
          <ForwardArrow className={styles.forword_icon} />
        </div>
      </div>
    </div>
  );
};
export default FrequentlyAskedQuestions;
