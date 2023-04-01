import React from 'react'
import { FaStar } from "react-icons/fa";

type Props = {
    setRating(data: any): any
    ratingValue: any
}

function StarRating({setRating, ratingValue}: Props) {
  

  const handleRatingClick = (event: any) => {
    const starNumber = parseInt(event.target.dataset.value, 10);
    setRating(starNumber);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          data-value={star}
          className={star <= ratingValue ? "star yellow" : "star gray"}
          onClick={handleRatingClick}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating