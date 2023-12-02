import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import RRList from './RRList';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import styles from './RatingsReviews.module.scss';

function RatingsReviews({
  setProductReviews,
  productReviews,
  currentProduct,
  averageRating,
}) {
  const [sortOption, setSortOption] = useState('relevance');

  function fetchSortedReviews(productId, sort) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productId}&sort=${sort}`, {
      headers: {
        'Authorization': process.env.REACT_APP_API_KEY
      },
    })
      .then((response) => {
        setProductReviews(response.data);
      })
      .catch((err) => {
        console.error('Error fetching sorted reviews', err);
      });
  }

  useEffect(() => {
    fetchSortedReviews(currentProduct.id, sortOption);
  }, [sortOption, currentProduct.id]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={styles.ratingComponents}>
      <div className={styles.reviewBreakdow}>
        <RatingBreakdown
          productReviews={productReviews}
          averageRating={averageRating}
        />
        <ProductBreakdown
          currentProduct={currentProduct}
        />
      </div>
      <div className={styles.reviewCards}>
        <h3 className={styles.reviewHeader}>
          {productReviews.count}
          <span> reviews, sorted by </span>
          <select onChange={handleSortChange} value={sortOption}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
            <option value="helpful">Helpful</option>
          </select>
        </h3>
        <RRList
          productReviews={productReviews}
          currentProduct={currentProduct}
        />
      </div>
    </div>
  );
}

RatingsReviews.propTypes = {
  setProductReviews: PropTypes.func.isRequired,
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
  averageRating: PropTypes.number.isRequired,
};

export default RatingsReviews;
