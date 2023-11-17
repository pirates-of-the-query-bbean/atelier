import React from 'react';
import styles from './Description.module.scss';


function Description({product}) {

  return (
    <div>
      {product ? product.description : 'All about the product'}
      </div>
  );
}

export default Description;