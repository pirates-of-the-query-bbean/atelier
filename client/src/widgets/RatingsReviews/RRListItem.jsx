import React from 'react';
import styles from './RRListItem.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';
import ParsedDate from '../../sharedComponents/ParsedDate';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';

const RRListItem = function ({ review }) {
  return (
    <div className={styles.review__item}>
      <FiveStars rating={review.rating} className={styles.starRatingContainer} />
      <div className={styles.review__date}>
        <span>V </span>
        <span>{review.reviewer_name}</span>
        <ParsedDate date={review.date} />
      </div>
      <div>
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
};

export default RRListItem;
