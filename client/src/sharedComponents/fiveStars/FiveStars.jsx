import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

function FiveStars({ rating }) {
  const renderStars = (starRating) => {
    const fullStars = Math.floor(starRating);
    const halfStars = starRating !== fullStars;
    let emptyStars = 5 - starRating;
    const stars = [];

    for (let i = 0; i < fullStars; i += 1) {
      stars.push(<StarIcon />);
    }

    if (halfStars) {
      stars.push(<StarHalfIcon />);
      emptyStars -= 1;
    }

    for (let j = 0; j < emptyStars; j += 1) {
      stars.push(<StarOutlineIcon />);
    }

    return stars;
  };

  return (
    <div data-testid="starRating" className="starRating">{rating ? renderStars(rating) : 'No reviews yet.'}</div>
  );
}

export default FiveStars;
