import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RRListItem from './RRListItem';
import NewReviewForm from './NewReviewForm';
import CustomButton from '../../sharedComponents/customButton/CustomButton';
import styles from './RRList.module.scss';

function RRList({ productReviews, currentProduct }) {
  RRList.propTypes = {
    productReviews: PropTypes.arrayOf.isRequired,
    currentProduct: PropTypes.shape.isRequired,
  };
  const [reviewRenderCount, setReviewRenderCount] = useState(2);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!productReviews || !productReviews.results) {
    return <div>No reviews available.</div>;
  }

  const handleMoreReviewsClick = () => {
    const newCount = Math.min(reviewRenderCount + 2, productReviews.results.length);
    setReviewRenderCount(newCount);
  };

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  return (
    <div className={styles.reviewList}>
      <div>
        {productReviews.results.slice(0, reviewRenderCount).map((review, index) => (
          <RRListItem
            key={index}
            review={review}
          />
        ))}
      </div>
      <div className={styles.reviewButtons}>
        {reviewRenderCount < productReviews.results.length && (
          <div><CustomButton text="More Reviews" onClickFunction={handleMoreReviewsClick} /></div>
        )}
        <div>
          <CustomButton
            text={showReviewForm ? 'Cancel' : 'Add a Review +'}
            onClickFunction={toggleReviewForm}
          />
        </div>
      </div>
      {showReviewForm && (
        <NewReviewForm
          closeForm={toggleReviewForm}
          currentProduct={currentProduct}
        />
      )}
    </div>
  );
}

export default RRList;
