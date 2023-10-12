import React from "react";
import styles from "./style.module.css";
import {Plus, Minus} from "@/assets/icon";

const SingleQuestion = ({item, isOpen, toggleQuestion}) => {
  return (
    <>
      <div className="pb-6">
        <div className={styles.quesWrapper} onClick={toggleQuestion}>
          <h3 className={styles.ques}>{item?.que}</h3>
          <div>
            {isOpen ? (
              <Minus className="cursor-pointer" size={20} color={"#222"} />
            ) : (
              <Plus className="cursor-pointer" size={20} color={"#222"} />
            )}
          </div>
        </div>
        <div>
          <div
            dangerouslySetInnerHTML={{__html: item?.ans}}
            className={`${styles.ans} ${isOpen && styles.ans_open}`}
          />
          <ul
            className={`${styles.ans} ${isOpen && styles.ans_open}`}
            style={{listStyle: "inside"}}>
            {item?.isChildren?.map((ele, idx) => (
              <li key={idx}>{ele}</li>
            ))}
          </ul>
          <p className={`${styles.ans} ${isOpen && styles.ans_open}`}>
            {item?.afterChild}
          </p>
          <ul
            className={`${styles.ans} ${isOpen && styles.ans_open}`}
            style={{listStyle: "inside"}}>
            {item?.secondChild?.map((ele, idx) => (
              <li key={idx}>{ele}</li>
            ))}
          </ul>
          <p className={`${styles.ans} ${isOpen && styles.ans_open}`}>
            {item?.afterSecondChild}
          </p>
        </div>
      </div>
    </>
  );
};

export default SingleQuestion;
