import React from "react";
import styles from "./style.module.css";
import {Plus, Minus} from "@/assets/icon";

const FAQQuestion = ({
  ques,
  ans,
  isOpen,
  toggleQuestion,
  applyBtn = false,
  applyClick,
}) => {
  return (
    <>
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
          {applyBtn && isOpen && (
            <div>
              <button className={styles.apply_btn} onClick={applyClick}>
                Apply
              </button>
              <p className={styles.addition_text}>
                Alternatively, you can drop your resume at{" "}
                <a
                  href="mailto:hello@cityfurnish.com"
                  className="text-5774AC underline font-medium">
                  hr@cityfurnish.com
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FAQQuestion;
