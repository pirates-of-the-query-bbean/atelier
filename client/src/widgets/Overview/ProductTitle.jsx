import React from 'react';
import styles from './ProductTitle.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';

function ProductTitle({
  product, price, averageRating, reviewCount,
}) {
  console.log(averageRating);
  return (
    <div className={styles.container}>
      {/* TODO get review rating and render conditionally if no reviews */}
      {reviewCount > 0 && (
      <div className={styles.ratingsReviews}>
        <FiveStars rating={averageRating || 1} />
        {' '}
        <a href="#reviews">
          {reviewCount}
          {' '}
          Reviews
        </a>
        {' '}
      </div>
      )}
      <h3>{product.category}</h3>
      <h1>{product ? product.name : 'A great product'}</h1>
      <h3>
        <span
          className={`${price.sale_price === null ? styles.hidden : null} ${
            styles.salePrice
          }`}
        >
          $
          {price.sale_price}
          {' '}
          SALE!
        </span>
        <span className={`${price.sale_price !== null ? styles.strike : null}`}>
          $
          {price.original_price}
        </span>
      </h3>
    </div>
  );
}

export default ProductTitle;
