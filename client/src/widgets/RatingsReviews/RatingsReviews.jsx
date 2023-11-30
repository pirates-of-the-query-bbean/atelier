import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RRList from './RRList';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';
import styles from './RatingsReviews.module.scss';

const RatingsReviews = function ({ setProductReviews, productReviews, currentProduct, averageRating }) {
  const [sortOption, setSortOption] = useState('relevance');

  useEffect(() => {
    fetchSortedReviews(currentProduct.id, sortOption);
  }, [sortOption, currentProduct.id]);

  const fetchSortedReviews = function (productId, sort) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?product_id=${productId}&sort=${sort}`, {
      headers: {
        'Authorization': process.env.REACT_APP_API_KEY
      },
    })
      .then(response => {
        setProductReviews(response.data);
      })
      .catch(err => {
        console.error('Error fetching sorted reviews', err);
      });
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className={styles.rating__components}>
      <div className={styles.review__breakdow}>
        <RatingBreakdown
          productReviews={productReviews}
          averageRating={averageRating}
        />
        <ProductBreakdown
          currentProduct={currentProduct}
        />
      </div>
      <div className={styles.review__cards}>
        <h3>
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
};

export default RatingsReviews;
