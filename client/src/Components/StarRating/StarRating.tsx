import React from 'react'
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';

type Props = {
    setRating(data: any): any
    ratingValue: any
}


const StarRatingWrapper = styled.div`
  display: inline-block;
  .star {
    font-size: 1rem;
    pointer-events: none;
    cursor: none;
 
  }
  .star.gray {
    color: #ccc;
  }
  .star.yellow {
    color: #ffdd00;
  }
`;

function StarRating({setRating, ratingValue}: Props) {
  

  const handleRatingClick = (event: any) => {
    const starNumber = parseInt(event.target.dataset.value, 10);
    setRating(starNumber);
  };

  return (
    <StarRatingWrapper>
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
    </StarRatingWrapper>
  );
};

export default StarRating