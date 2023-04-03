import React from 'react'
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';

type Props = {
    setRating(data: any): any
    ratingValue: any
    changable: any
}


const StarRatingWrapper = styled.div<{changable: any}>`
  display: inline-block;
  .star {
    font-size: 1rem;
    pointer-events: ${({ changable }) => (changable ? 'default' : 'none')};
    cursor: ${({ changable }) => (changable ? 'pointer' : 'none')};
 
  }
  .star.gray {
    color: #ccc;
  }
  .star.yellow {
    color: #ffdd00;
  }
`;

function StarRating({setRating, ratingValue, changable}: Props) {
  

  const handleRatingClick = (event: any) => {
    const starNumber = parseInt(event.target.dataset.value, 10);
    setRating(starNumber);
  };

  return (
    <StarRatingWrapper changable={changable}>
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