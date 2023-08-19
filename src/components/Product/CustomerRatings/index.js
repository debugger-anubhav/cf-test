import React, {useState, useEffect} from "react";
import styles from "./styles.module.css";
import Rating from "react-rating";
import {RatingStar} from "@/assets/icon";
// import RatingProgressBar from "./ProgressBar";
// import {ProductRatings} from "@/constants/constant";
import SideDrawer from "../Drawer/Drawer";
// import ReviewsSection from "./ReviewsSection";
import RatingBar from "./RatingBar";
import {useDispatch, useSelector} from "react-redux";
import {getCustomerReviews} from "@/store/Slices";
import {endPoints} from "@/network/endPoints";
import axios from "axios";
import {baseURL} from "@/network/axios";
import {format} from "date-fns";

const CustomerRating = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dispatch = useDispatch();
  const pageData = useSelector(state => state.productPageData);

  const getReviews = () => {
    axios
      .get(baseURL + endPoints.productPage.customerReviews)
      .then(res => {
        dispatch(getCustomerReviews(res?.data?.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getCustomerReviews([]));
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  const reviewsPerPage = 4;
  const totalReviews = pageData.customerReviews.length;

  // Calculate the range of reviews to display on the current page
  const startIndex = open ? (currentPage - 1) * reviewsPerPage : 0;
  const endIndex = open ? startIndex + reviewsPerPage : 3;

  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <RatingBar />
      </div>

      <div className={styles.right_div}>
        {/* <ReviewsSection
          open={open}
          startIndex={startIndex}
          endIndex={endIndex}
        /> */}
        {pageData?.customerReviews?.slice(0, 3).map((item, index) => (
          <div key={index} className={styles.single_rating_div}>
            <div className="flex gap-2">
              <Rating
                stop={5}
                initialRating={item.rating}
                // step={0.5}
                fractions={2}
                emptySymbol={
                  <RatingStar color={"white"} className={styles.star} />
                }
                fullSymbol={
                  <RatingStar color={"#F6B704"} className={styles.star} />
                }
                readonly
              />
            </div>
            <p className={styles.rating_desc}>{item.review_description}</p>
            <p className={styles.date_text}>
              Posted by {item.full_name} on{" "}
              {`${format(new Date(item.updated_on), "d MMMM, yyyy")}`}
            </p>
          </div>
        ))}

        <button className={styles.more_btn} onClick={toggleDrawer}>
          View all ratings
        </button>

        {open && (
          <SideDrawer
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            endIndex={endIndex}
            startIndex={startIndex}
            toggleDrawer={toggleDrawer}
            open={open}
            totalReviews={totalReviews}
            drawerType={"ratings"}
          />
        )}
      </div>
    </div>
  );
};

export default CustomerRating;
