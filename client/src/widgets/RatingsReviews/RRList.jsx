import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RRListItem from './RRListItem';
import NewReviewForm from './NewReviewForm';
import CustomButton from '../../sharedComponents/customButton/CustomButton';
import styles from './RRList.module.scss';

function RRList({ productReviews, currentProduct }) {
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

RRList.propTypes = {
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
  currentProduct: PropTypes.shape({
    campus: PropTypes.string,
    category: PropTypes.string,
    created_at: PropTypes.string,
    default_price: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    slogan: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default RRList;
