import React from "react";
import styles from "./styles.module.css";
import Rating from "react-rating";
import {RatingStar} from "@/assets/icon";
import RatingProgressBar from "./ProgressBar";
import {ProductRatings} from "@/constants/constant";

const CustomerRating = () => {
  const ratings = {
    oneStar: 2,
    twoStar: 1,
    threeStar: 4,
    fourStar: 6,
    fiveStar: 12,
    total: 25,
  };
  return (
    <div className={styles.main_container}>
      <div className={styles.left_div}>
        <h2 className={styles.head}>Customer Ratings</h2>
        <div>
          <div className={styles.subhead}>
            <p className={styles.avg_rating}>
              4.5
              <span>
                {" "}
                <RatingStar color={"#F6B704"} className={styles.star} />
              </span>
            </p>

            <p className={styles.noOfCustomer}>By 25 customers</p>
          </div>

          <div>
            <RatingProgressBar ratings={ratings} />
          </div>
        </div>
      </div>

      <div className={styles.right_div}>
        {ProductRatings.slice(0, 3).map((item, index) => (
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
            <p className={styles.rating_desc}>{item.content}</p>
            <p className={styles.date_text}>
              Posted by {item.name} on {item.date}
            </p>
          </div>
        ))}

        <button className={styles.more_btn}>View all ratings</button>
      </div>
    </div>
  );
};

export default CustomerRating;
