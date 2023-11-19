import React from 'react';
import styles from './RatingBreakdown.module.scss'; // Make sure to create a corresponding SCSS file

const RatingBreakdown = function ({ productReviews, reviewAverage }) {
  let recommendPercentage = 0;
  let ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  if (productReviews && productReviews.results) {
    // Calculate the recommendation percentage
    recommendPercentage = (
      (productReviews.results.filter(review => review.recommend).length / productReviews.results.length) * 100
    ).toFixed(0);

    // Count the number of reviews per star
    productReviews.results.forEach(review => {
      if (ratingCounts.hasOwnProperty(review.rating)) {
        ratingCounts[review.rating]++;
      }
    });
  }

  // Calculate the width percentage of each rating bar
  const totalReviews = productReviews.results ? productReviews.results.length : 0;
  let ratingPercentages = {};
  for (const [key, value] of Object.entries(ratingCounts)) {
    ratingPercentages[key] = totalReviews > 0 ? ((value / totalReviews) * 100).toFixed(0) : 0;
  }


  return (
    <div className={styles.ratingBreakdown}>
      <div className={styles.averageRating}>{reviewAverage} <span className={styles.stars}>★★★★★</span></div>
      <div className={styles.recommendation}>
        {recommendPercentage}% of reviews recommend this product
      </div>
      {Object.keys(ratingCounts).reverse().map(star => (
        <div key={star} className={styles.ratingRow}>
          <div className={styles.starLabel}>{star} stars</div>
          <div className={styles.ratingBarContainer}>
            <div className={styles.ratingBar} style={{ width: `${ratingPercentages[star]}%` }}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingBreakdown;