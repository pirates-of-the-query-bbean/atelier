import React from 'react';
import styles from './ProductTitle.module.scss';
import FiveStars from '../../sharedComponents/FiveStars.jsx';

function ProductTitle({product, price}) {

  return (
    <div>
      {/* TODO get review rating and render conditionally if no reviews */}
      <div><FiveStars rating="3" /> <a href="#" >Reviews</a> </div>
      <h3>{product.category}</h3>
      <h1>{product ? product.name : 'A great product'}</h1>
      <h3>${price}</h3>
      </div>
  );
}

export default ProductTitle;
