import React from 'react';
import RRList from './RRList';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import styles from './RatingsReviews.module.scss';

const RatingsReviews = function ({ productReviews, currentProduct }) {
  return (
    <div className={styles.rating__components}>
      <div className={styles.review__breakdow}>
        <RatingBreakdown productReviews={productReviews} />
        <ProductBreakdown currentProduct={currentProduct} />
      </div>
      <div className={styles.review__cards}>
        <h3>
          {productReviews.count}
          <span> reviews, sorted by </span>
          <select>
            <option>relevance</option>
          </select>
        </h3>
        <RRList productReviews={productReviews} />
      </div>
    </div>
  );
};

export default RatingsReviews;
