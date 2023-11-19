import React from 'react';
import RRList from './RRList';
import RatingBreakdown from './RatingBreakdown';

const RatingsReviews = function ({ productReviews }) {
  return (
    <div>
      <h3>{productReviews.count}
        <span> reviews, sorted by </span>
        <select>
          <option>relevance</option>
        </select>
      </h3>
      <div><RatingBreakdown productReviews={productReviews} /></div>
      <div><RRList productReviews={productReviews} /></div>
    </div>
  );
};

export default RatingsReviews;
