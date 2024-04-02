import React from "react";
import styles from "./style.module.css";
import {Plus, Minus} from "@/assets/icon";

const SingleQuestion = ({ques, ans, isOpen, toggleQuestion}) => {
  return (
    <div className="pb-6">
      <div className={styles.quesWrapper} onClick={toggleQuestion}>
        <h3 className={styles.ques}>{ques}</h3>
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
          dangerouslySetInnerHTML={{__html: ans}}
          className={`${styles.ans} ${isOpen && styles.ans_open}`}
        />
      </div>
    </div>
  );
};

export default SingleQuestion;
