import React, { useEffect, useState } from 'react';
import RRListItem from './RRListItem';
import NewReviewForm from './NewReviewForm';
import CustomButton from '../../sharedComponents/customButton/CustomButton';
import styles from './RRList.module.scss';

const RRList = function ({ productReviews, currentProduct }) {
  const [reviewRenderCount, setReviewRenderCount] = useState(2);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!productReviews || !productReviews.results) {
    return <div>No reviews available.</div>;
  }

  const handleMoreReviewsClick = () => {
    const newCount = Math.min(reviewRenderCount + 2, productReviews.results.length);
    setReviewRenderCount(newCount);
  };

  const handleAddReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setShowReviewForm(false);
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
        <div><CustomButton text="Add a Review +" onClickFunction={handleAddReviewClick} /></div>
      </div>
      {showReviewForm && (
        <NewReviewForm
          closeForm={handleCloseReviewForm}
          currentProduct={currentProduct}
        />
      )}
    </div>
  );
};

export default RRList;
