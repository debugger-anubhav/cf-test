import React from "react";
import styles from "./style.module.css";

const QuesAndAns = () => {
  const quesAnsarray = [
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
    {
      q: "Is the return policy available?",
      a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
    },
  ];
  return (
    <div className={styles.main_container}>
      <h1 className={styles.head}>Product QnA</h1>
      <div className={styles.ques_ans_wrapper}>
        {quesAnsarray.slice(0, 3).map((item, index) => (
          <div key={index} className={styles.ques_ans_div}>
            <div className={styles.single_row}>
              <p className={styles.ques}> Q:</p>
              <p className={styles.ques}>{item.q}</p>
            </div>
            <div className={`mt-[9.5px] lg:mt-4 ${styles.single_row}`}>
              <p className={`${styles.ques} hidden lg:block`}>A:</p>
              <div>
                <p className={styles.ans}>{item.a}</p>
                <p className={styles.bottom_txt}>
                  Answered by CityFurnish on 4th July, 2023
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.more_btn}>View all ratings</button>
    </div>
  );
};

export default QuesAndAns;
