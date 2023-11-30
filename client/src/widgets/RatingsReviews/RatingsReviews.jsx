import React from 'react';
import RRList from './RRList';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import styles from './RatingsReviews.module.scss';

const RatingsReviews = function ({ productReviews, currentProduct, averageRating }) {
  return (
    <div className={styles.rating__components}>
      <div className={styles.review__breakdow}>
        <RatingBreakdown
          productReviews={productReviews}
          averageRating={averageRating}
        />
        <ProductBreakdown
          currentProduct={currentProduct}
        />
      </div>
      <div className={styles.review__cards}>
        <h3>
          {productReviews.count}
          <span> reviews, sorted by </span>
          <select>
            <option>relevance</option>
          </select>
        </h3>
        <RRList
          productReviews={productReviews}
          currentProduct={currentProduct}
        />
      </div>
    </div>
  );
};

export default RatingsReviews;
