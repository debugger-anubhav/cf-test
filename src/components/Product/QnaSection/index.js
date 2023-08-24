import React, {useState, useEffect} from "react";
import styles from "./style.module.css";
import SideDrawer from "../Drawer/Drawer";
import {getProductQuesAns} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {useDispatch, useSelector} from "react-redux";
import {format} from "date-fns";

const QuesAndAns = ({params}) => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData.qna);

  const getQuesAnsFunction = () => {
    axios
      .get(baseURL + endPoints.productPage.qna(params.productId))
      .then(res => {
        dispatch(getProductQuesAns(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getProductQuesAns([]));
      });
  };

  useEffect(() => {
    getQuesAnsFunction();
  }, []);

  const questionsPerPage = 4;
  const totalQuestions = pageData?.length;

  // Calculate the range of reviews to display on the current page
  const startIndex = open ? (currentPage - 1) * questionsPerPage : 0;
  const endIndex = open ? startIndex + questionsPerPage : 3;

  if (pageData.length > 0) {
    return (
      <div className={styles.main_container}>
        <h1 className={styles.head}>Product QnA</h1>
        <div className={styles.ques_ans_wrapper}>
          {pageData?.slice(0, 3).map((item, index) => (
            <div key={index} className={styles.ques_ans_div}>
              <div className={styles.single_row}>
                <p className={styles.ques}> Q:</p>
                <p className={styles.ques}>{item.question}</p>
              </div>
              <div className={`mt-[9.5px] lg:mt-4 ${styles.single_row}`}>
                <div className={`${styles.ques} hidden lg:block`}>A:</div>
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

        {!open && (
          <button className={styles.more_btn} onClick={toggleDrawer}>
            View all questions
          </button>
        )}

        {open && (
          <SideDrawer
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            endIndex={endIndex}
            startIndex={startIndex}
            toggleDrawer={toggleDrawer}
            open={open}
            totalQuestions={totalQuestions}
            drawerType={"QnA"}
          />
        )}
      </div>
    );
  } else {
    return <div className="h-[88px] w-full"></div>;
  }
};

export default QuesAndAns;
