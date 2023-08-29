import React from "react";
import styles from "./styles.module.css";
import {RatingStar} from "@/assets/icon";
import RatingProgressBar from "./ProgressBar";
import {useSelector} from "react-redux";

const RatingBar = () => {
  const pageData = useSelector(state => state.productPageData.customerReviews);
  const totalReviews = pageData?.length;

  const totalRatingSum = pageData?.reduce((sum, item) => {
    const rating = parseFloat(item.rating);
    return isNaN(rating) ? sum : sum + rating;
  }, 0);

  const averageRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

  const ratingCounts = pageData?.reduce((acc, item) => {
    const rating = Math.round(item.rating);
    if (!isNaN(rating)) {
      if (acc[rating]) {
        acc[rating]++;
      } else {
        acc[rating] = 1;
      }
    }
    return acc;
  }, {});

  const ratings = {
    oneStar: ratingCounts?.[1] || 0,
    twoStar: ratingCounts?.[2] || 0,
    threeStar: ratingCounts?.[3] || 0,
    fourStar: ratingCounts?.[4] || 0,
    fiveStar: ratingCounts?.[5] || 0,
    total: totalReviews,
  };

  return (
    <div>
      <h2 className={styles.head}>Customer Ratings</h2>
      <div>
        <div className={styles.subhead}>
          <p className={styles.avg_rating}>
            {averageRating.toFixed(1)}
            <span>
              {" "}
              <RatingStar color={"#F6B704"} className={styles.star} />
            </span>
          </p>

          <p className={styles.noOfCustomer}>By {totalReviews} customers</p>
        </div>

        <div>
          <RatingProgressBar ratings={ratings} />
        </div>
      </div>
    </div>
  );
};

export default RatingBar;
