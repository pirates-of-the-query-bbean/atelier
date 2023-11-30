import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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
  RatingsReviews.propTypes = {
    setProductReviews: PropTypes.func.isRequired,
    productReviews: PropTypes.arrayOf.isRequired,
    currentProduct: PropTypes.shape.isRequired,
    averageRating: PropTypes.number.isRequired,
  };
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
}

export default RatingsReviews;
