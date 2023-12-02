import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import styles from './RatingBreakdown.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';

function RatingBreakdown({ productReviews, averageRating }) {
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
      (productReviews.results.filter((review) => review.recommend).length
        / productReviews.results.length) * 100
    ).toFixed(0);

    productReviews.results.forEach((review) => {
      if (ratingCounts.hasOwnProperty(review.rating)) {
        ratingCounts[review.rating]++;
      }
    });
  }

  const totalReviews = productReviews.results ? productReviews.results.length : 0;
  const ratingPercentages = {};

  Object.keys(ratingCounts).forEach((key) => {
    const value = ratingCounts[key];
    ratingPercentages[key] = totalReviews > 0 ? ((value / totalReviews) * 100).toFixed(0) : 0;
  });

  return (
    <div className={styles.ratingBreakdown} data-testid="ratingBreakdown">
      <div className={styles.averageRating}>
        {averageRating}
        <FiveStars rating={averageRating} />
      </div>
      <div className={styles.recommendation}>
        {recommendPercentage}
        % of reviews recommend this product
      </div>
      {Object.keys(ratingCounts).reverse().map((star) => (
        <div key={star} className={styles.ratingRow}>
          <div className={styles.starLabel}>
            {star}
            <StarIcon />
          </div>
          <div className={styles.ratingBarContainer}>
            <div
              className={styles.ratingBar}
              style={{ width: `${ratingPercentages[star]}%` }}
            >
              {/* bar */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

RatingBreakdown.propTypes = {
  productReviews: PropTypes.shape({
    product: PropTypes.string,
    page: PropTypes.number,
    count: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.shape({
      body: PropTypes.string,
      date: PropTypes.string,
      helpfulness: PropTypes.number,
      photos: PropTypes.arrayOf(PropTypes.string),
      rating: PropTypes.number,
      recommend: PropTypes.bool,
      response: PropTypes.string,
      review_id: PropTypes.number,
      reviewer_name: PropTypes.string,
      summary: PropTypes.string,
    })),
  }).isRequired,
  averageRating: PropTypes.number.isRequired,
};

export default RatingBreakdown;
