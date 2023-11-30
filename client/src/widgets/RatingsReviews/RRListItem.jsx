import React from 'react';
import PropTypes from 'prop-types';
import styles from './RRListItem.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';
import ParsedDate from '../../sharedComponents/ParsedDate';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';

function RRListItem({ review }) {
  RRListItem.propTypes = {
    review: PropTypes.shape.isRequired,
  };

  return (
    <div className={styles.review__item}>
      <FiveStars rating={review.rating} className={styles.starRatingContainer} />
      <div className={styles.review__date}>
        <span>*Verified*</span>
        <span>{review.reviewer_name}</span>
        <ParsedDate date={review.date} />
      </div>
      <div className={styles.review__body}>
        Summary:
        {' '}
        {review.summary}
      </div>
      <div className={styles.review__body}>
        Review:
        {' '}
        {review.body}
      </div>
      <div>
        <UpvoteLink item={review} property="helpfulness" />
      </div>
    </div>
  );
}

export default RRListItem;
