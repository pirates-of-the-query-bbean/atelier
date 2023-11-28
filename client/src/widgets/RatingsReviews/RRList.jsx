import React, { useEffect, useState } from 'react';
import RRListItem from './RRListItem';
import CustomButton from '../../sharedComponents/customButton/CustomButton';
import styles from './RRList.module.scss';

const RRList = function ({ productReviews }) {
  const [reviewRenderCount, setReviewRenderCount] = useState(2);

  if (!productReviews || !productReviews.results) {
    return <div>No reviews available.</div>;
  }

  const handleMoreReviewsClick = () => {
    const newCount = Math.min(reviewRenderCount + 2, productReviews.results.length);
    setReviewRenderCount(newCount);
  };

  return (
    <div>
      <div>
        {productReviews.results.slice(0, reviewRenderCount).map((review, index) => (
          <RRListItem
            key={index}
            review={review}
          />
        ))}
      </div>
      <div className={styles.review__buttons}>
        {reviewRenderCount < productReviews.results.length && (
          <div><CustomButton text="More Reviews" onClickFunction={handleMoreReviewsClick} /></div>
        )}
        <div><CustomButton text="Add a Review +" /></div>
      </div>
    </div>
  );
};

export default RRList;
