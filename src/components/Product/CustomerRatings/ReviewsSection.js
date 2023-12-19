import React from "react";
import styles from "./styles.module.css";
import Rating from "react-rating";
import {RatingStar} from "@/assets/icon";
// import {ProductRatings} from "@/constants/constant";
import {useSelector} from "react-redux";
import {format} from "date-fns";

const ReviewsSection = ({
  open,
  currentPage,
  startIndex,
  endIndex,
  reviewsPerPage,
}) => {
  const pageData = useSelector(state => state.productPageData);
  return (
    <div>
      {pageData?.customerReviews
        .slice(startIndex, endIndex)
        .map((item, index) => (
          <div key={index} className={styles.single_rating_div}>
            <div className="flex gap-2">
              <Rating
                stop={5}
                initialRating={item.rating}
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
    </div>
  );
};

export default ReviewsSection;
