import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './ProductBreakdown.module.scss';

function ProductBreakdown({ currentProduct }) {
  ProductBreakdown.propTypes = {
    currentProduct: PropTypes.shape.isRequired,
  };
  const [productData, setProductData] = useState({ characteristics: {} });

  const getProductData = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta/?product_id=${currentProduct.id}`, {
      headers: {
        'Authorization': process.env.REACT_APP_API_KEY
      },
    })
      .then((response) => {
        setProductData(response.data);
      })
      .catch((err) => {
        console.log('error fetching products', err);
      });
  };

  useEffect(() => {
    if (currentProduct && currentProduct.id) {
      getProductData();
    }
  }, [currentProduct]);

  const calculatePercentage = (value) => (parseFloat(value) - 1) * 25;

  return (
    <div className={styles.productBreakdown}>
      {Object.keys(productData.characteristics).map((charName) => {
        const charValue = productData.characteristics[charName].value;
        return (
          <div key={productData.characteristics[charName].id} className={styles.characteristic}>
            <div className={styles.characteristicName}>{charName}</div>
            <div className={styles.characteristicBarContainer}>
              <div className={styles.characteristicBar}>
                {/* bar */}
              </div>
              <div
                className={styles.characteristicIcon}
                style={{ left: `${calculatePercentage(charValue)}%` }}
              >
                {/* icon */}
              </div>
            </div>
            <div className={styles.characteristicLabels}>
              <span>{charName === 'Size' || charName === 'Width' || charName === 'Fit' ? 'Too small' : 'Poor'}</span>
              <span>{charName === 'Size' || charName === 'Width' || charName === 'Fit' ? 'Too large' : 'Great'}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductBreakdown;
