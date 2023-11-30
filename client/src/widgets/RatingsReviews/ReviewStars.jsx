import React, { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ratingDescriptions = {
  1: 'Poor',
  2: 'Fair',
  3: 'Average',
  4: 'Good',
  5: 'Great',
};

function ReviewStars({ setRating }) {
  const [currentRating, setCurrentRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(undefined);

  const onStarClick = (rating) => {
    setCurrentRating(rating);
    setRating(rating);
  };

  const onStarHover = (rating) => {
    setHoverRating(rating);
  };

  const onStarHoverOut = () => {
    setHoverRating(undefined);
  };

  const renderStars = () => {
    let stars = [];
    const finalRating = hoverRating || currentRating;

    for (let i = 1; i <= 5; i += 1) {
      stars.push(
        <span
          key={i}
          onClick={() => onStarClick(i)}
          onMouseOver={() => onStarHover(i)}
          onMouseOut={onStarHoverOut}
          style={{ cursor: 'pointer' }}
        >
          {i <= finalRating ? <StarIcon color='black' /> : <StarOutlineIcon />}
        </span>,
      );
    }
    return stars;
  };

  return (
    <div className='review-stars'>
      {renderStars()}
      {currentRating !== 0 && <span className='review-stars__description'>{ratingDescriptions[currentRating]}</span>}
    </div>
  );
}

export default ReviewStars;
