import React from 'react';
import styles from './RatingBreakdown.module.scss';

const RatingBreakdown = function ({ productReviews, reviewAverage }) {
  let recommendPercentage = 0;
  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  if (productReviews && productReviews.results) {
    recommendPercentage = (
      (productReviews.results.filter(review => review.recommend).length
        / productReviews.results.length) * 100
    ).toFixed(0);

    productReviews.results.forEach(review => {
      if (ratingCounts.hasOwnProperty(review.rating)) {
        ratingCounts[review.rating]++;
      }
    });
  }

  const totalReviews = productReviews.results ? productReviews.results.length : 0;
  let ratingPercentages = {};
  for (const [key, value] of Object.entries(ratingCounts)) {
    ratingPercentages[key] = totalReviews > 0 ? ((value / totalReviews) * 100).toFixed(0) : 0;
  }

  return (
    <div className={styles.ratingBreakdown}>
      <div className={styles.averageRating}>
        {reviewAverage}
        <span className={styles.stars}>
          ★★★★★
        </span>
      </div>
      <div className={styles.recommendation}>
        {recommendPercentage}
        % of reviews recommend this product
      </div>
      {Object.keys(ratingCounts).reverse().map(star => (
        <div key={star} className={styles.ratingRow}>
          <div className={styles.starLabel}>{star} stars</div>
          <div className={styles.ratingBarContainer}>
            <div className={styles.ratingBar}
              style={{ width: `${ratingPercentages[star]}%` }}>
              {/* bar */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingBreakdown;
