import React from "react";

export const StarRating = ({rating}) => {
  // Calculate the percentage of stars to show based on the rating (assuming a 5-star system)
  const percentage = (rating / 5) * 100;

  return (
    <div className="star-rating">
      <div className="star-rating-inner" style={{width: `${percentage}%`}}>
        ★★★★★
      </div>
    </div>
  );
};
