import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styles from './Description.module.scss';
import SocialShare from './SocialShare';

function Description({ product }) {
  return (
    <div data-testid="description" className={styles.container}>
      <div className={styles.text}>
        <h3>{product.slogan}</h3>
        <p>
          {product ? product.description : 'All about the product'}
        </p>
        <SocialShare />
      </div>
      <aside>
        <ul>

          {product.features ? product.features.map((feature, i) => (
            <li key={i}>
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
