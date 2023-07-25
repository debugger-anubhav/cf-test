import React, {useState} from "react";
import styles from "./style.module.css";
import {Plus, Minus} from "@/assets/icon";

const SingleQuestion = ({ques, ans}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  return (
    <div className="pb-6">
      <div className={styles.quesWrapper}>
        <h3 className={styles.ques}>{ques}</h3>
        <div onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? (
            <Minus className="cursor-pointer" size={20} color={"#222"} />
          ) : (
            <Plus className="cursor-pointer" size={20} color={"#222"} />
          )}
        </div>
      </div>
      <div>{showAnswer && <p className={styles.ans}>{ans}</p>}</div>
    </div>
  );
};

export default SingleQuestion;
