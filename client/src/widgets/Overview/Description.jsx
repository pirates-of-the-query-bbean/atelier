import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Description.module.scss';

function Description({ product }) {
  console.log(product);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h3>{product.slogan}</h3>
        <p>
          {product ? product.description : 'All about the product'}
        </p>
      </div>
      <aside>
        <ul>

          {product.features ? product.features.map((feature) => (
            <li>
              <CheckIcon />
              {feature.value}
              {' '}
              {feature.feature}
            </li>
          )) : null}
        </ul>
      </aside>
    </div>
  );
}

export default Description;
