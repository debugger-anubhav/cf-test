import React from "react";
import {Line} from "rc-progress";
import {RatingStar} from "@/assets/icon";
import styles from "./styles.module.css";

const RatingProgressBar = ({ratings}) => {
  // Calculate the percentage of each rating (e.g., 5-star, 4-star, etc.)
  const percentage5Star = (ratings.fiveStar / ratings.total) * 100;
  const percentage4Star = (ratings.fourStar / ratings.total) * 100;
  const percentage3Star = (ratings.threeStar / ratings.total) * 100;

  const percentage2Star = (ratings.twoStar / ratings.total) * 100;

  const percentage1Star = (ratings.oneStar / ratings.total) * 100;

  // ... Calculate other percentages for different ratings

  const arr = [
    {
      percent: percentage5Star,
      color: "#67AF7B",
      noOfRatings: ratings.fiveStar,
    },
    {
      percent: percentage4Star,
      color: "#67AF7B",
      noOfRatings: ratings.fourStar,
    },
    {
      percent: percentage3Star,
      color: "#67AF7B",
      noOfRatings: ratings.threeStar,
    },
    {
      percent: percentage2Star,
      color: "#FFE700",
      noOfRatings: ratings.twoStar,
    },
    {
      percent: percentage1Star,
      color: "#D96060",
      noOfRatings: ratings.oneStar,
    },
  ];

  return (
    <div className="mt-6">
      {arr.map((item, index) => (
        <div key={index.toString()} className={styles.single_progress_bar}>
          <p className={styles.star_value}>
            {arr.length - index}
            <span>
              <RatingStar className={styles.sm_star} color={"#F6B704"} />
            </span>
          </p>

          <div className="w-[246px] custom-progress-bar">
            <Line
              percent={item.percent}
              strokeWidth="6"
              trailWidth="6"
              strokeColor={item.color}
              strokeLinecap="butt"
              width="100%"
            />
          </div>
          <p className={styles.noOfRatings}>{item.noOfRatings}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingProgressBar;
