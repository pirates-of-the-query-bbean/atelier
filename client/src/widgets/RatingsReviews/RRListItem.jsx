import React from 'react';
import PropTypes from 'prop-types';
import styles from './RRListItem.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';
import ParsedDate from '../../sharedComponents/ParsedDate';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import ReportButton from '../../sharedComponents/reportButton/ReportButton';

function RRListItem({ review }) {
  console.log(review, review.review_id)
  return (
    <div className={styles.reviewItem}>
      <div className={styles.reviewHeader}>
        <FiveStars rating={review.rating} className={styles.starRatingContainer} />
        <div className={styles.reviewDate}>
          {/* <span></span> */}
          <span>{review.reviewer_name}</span>
          <ParsedDate date={review.date} />
        </div>
      </div>
      <div className={styles.reviewSummary}>
        {review.summary}
      </div>
      <div className={styles.reviewBody}>
        {review.body}
      </div>
      {review.recommend === true && (
      <div className={styles.reviewRecommendation}>
        <span className={styles.checkmark}>✓</span>
        I recommend this product
      </div>
      )}
      {review.response && (
      <div className={styles.reviewResponse}>
        Response:
        {review.response}
      </div>
      )}
      <div className={styles.reviewFooter}>
        <div>
          <UpvoteLink item={review} itemType="review" property="helpfulness" />
        </div>
        <div>
          <ReportButton itemType="review" id={review.review_id.toString()} />
        </div>
      </div>
    </div>
  );
}

RRListItem.propTypes = {
  review: PropTypes.shape({
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
  }).isRequired,
};

export default RRListItem;
