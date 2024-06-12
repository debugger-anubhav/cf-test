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
        <div
          className={`${!isOpen ? "hidden" : ""} ${styles.ans_wrapper}`.trim()}>
          <div
            dangerouslySetInnerHTML={{__html: item?.ans}}
            className={`${styles.ans} ${isOpen ? styles.ans_open : ""}`.trim()}
          />
          {item?.isChildren?.length && (
            <ul
              className={`${styles.ans} ${
                isOpen ? styles.ans_open : ""
              }`.trim()}
              style={{listStyle: "inside"}}>
              {item?.isChildren?.map((ele, idx) => (
                <li key={idx}>{ele}</li>
              ))}
            </ul>
          )}
          {item?.afterChild && (
            <div
              dangerouslySetInnerHTML={{__html: item?.afterChild}}
              className={`${styles.ans} ${
                isOpen ? styles.ans_open : ""
              }`.trim()}
            />
          )}
          {item?.secondChild?.length && (
            <ul
              className={`${styles.ans} ${
                isOpen ? styles.ans_open : ""
              }`.trim()}
              style={{listStyle: "inside"}}>
              {item?.secondChild?.map((ele, idx) => (
                <li key={idx}>{ele}</li>
              ))}
            </ul>
          )}
          {item?.afterSecondChild && (
            <p
              className={`${styles.ans} ${
                isOpen ? styles.ans_open : ""
              }`.trim()}>
              {item?.afterSecondChild}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleQuestion;
