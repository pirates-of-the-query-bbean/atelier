import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const FiveStars = ({rating}) => {

  const renderStars = (rating) => {
    let fullStars = Math.floor(rating);
    let halfStars = rating !== fullStars
    let emptyStars = 5 - rating;
    const stars = [];

    for (var i = 0; i < fullStars; i++) {
      stars.push(<StarIcon />);
    };

    if (halfStars) {
      stars.push(<StarHalfIcon />);
      emptyStars--;
  };

    for (var j = 0; j < emptyStars; j++) {
      stars.push(<StarOutlineIcon />);
    };

    return stars;
  }

  return (
    <div className="starRating">{rating ? renderStars(rating) : 'No reviews yet.'}</div>
  )

}

export default FiveStars;