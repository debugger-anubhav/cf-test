import React, {useState} from "react";
import Drawer from "@mui/material/Drawer";
// import CustomerRating from "../CustomerRatings";
import RatingBar from "../CustomerRatings/RatingBar";
import ReviewsSection from "../CustomerRatings/ReviewsSection";
import styles from "./styles.module.css";
import {Close} from "@/assets/icon";
import Qna from "../QnaSection/drawer/Qna";

const SideDrawer = ({
  toggleDrawer,
  open,
  endIndex,
  startIndex,
  totalReviews,
  currentPage,
  setCurrentPage,
  totalQuestions,
  drawerType,
}) => {
  const [isBottomDrawer, setIsBottomDrawer] = useState(false);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleresize = e => {
    if (window.innerWidth < 1024) {
      setIsBottomDrawer(true);
    } else {
      setIsBottomDrawer(false);
    }
  };
  React.useEffect(() => {
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, []);

  return (
    <div>
      <Drawer
        anchor={isBottomDrawer ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        // transitionDuration={{enter: 800, exit: 600}}
        classes={{paper: styles.bottomDrawer}}>
        <div className={styles.main_wrapper}>
          <div className={styles.rating_drawer}>
            <div
              className={styles.close_icon}
              onClick={() => {
                toggleDrawer();
                console.log("click");
              }}>
              <Close color={"#45454A"} size={24} className="cursor-pointer" />
            </div>

            {drawerType === "ratings" ? (
              <div>
                <div className={`${currentPage === 1 ? "flex" : "hidden"}`}>
                  <RatingBar />
                </div>
                <div className={styles.review_section}>
                  <ReviewsSection
                    open={open}
                    currentPage={currentPage}
                    startIndex={startIndex}
                    endIndex={endIndex}
                  />
                </div>
              </div>
            ) : (
              // drawer for  qna
              <Qna startIndex={startIndex} endIndex={endIndex} />
            )}

            <div className={styles.btn_div}>
              <button
                className={`${styles.btn} ${
                  currentPage === 1
                    ? "text-9A9AA2 border-9A9AA2"
                    : "text-71717A border-71717A"
                }`}
                onClick={handlePreviousPage}
                disabled={currentPage === 1}>
                {currentPage !== 1 && "<"} Previous Page
              </button>
              <button
                className={`${styles.btn} ${
                  endIndex >= totalReviews
                    ? "text-9A9AA2 border-9A9AA2"
                    : "text-71717A border-71717A"
                }`}
                onClick={handleNextPage}
                disabled={endIndex >= totalReviews}>
                Next Page {!(endIndex >= totalReviews) && ">"}
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default SideDrawer;
