import React from "react";
import styles from "../style.module.css";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const Qna = ({startIndex, endIndex}) => {
  const pageData = useSelector(state => state.productPageData.qna);

  // const quesAnsarray = [
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  //   {
  //     q: "Is the return policy available?",
  //     a: "Return is not allowed. Only 10 days replacement is allowed for products received with damage or any manufacturing defect.",
  //   },
  // ];
  return (
    <div>
      <h1 className={styles.head}>Product QnA</h1>
      <div className={styles.ques_ans_wrapper}>
        {pageData?.slice(startIndex, endIndex).map((item, index) => (
          <div key={index} className={styles.ques_ans_div}>
            <div className={styles.single_row}>
              <p className={styles.ques}> Q:</p>
              <p className={styles.ques}>{item.question}</p>
            </div>
            <div className={`mt-[9.5px] lg:mt-4 ${styles.single_row}`}>
              <p className={`${styles.ques} hidden lg:block`}>A:</p>
              <div>
                <div
                  dangerouslySetInnerHTML={{__html: item.answer}}
                  className={styles.ans}
                />
                <p className={styles.bottom_txt}>
                  Answered by CityFurnish on{" "}
                  {`${format(new Date(item.created_at), "d MMMM, yyyy")}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Qna;
