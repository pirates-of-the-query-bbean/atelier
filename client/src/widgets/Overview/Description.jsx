import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import { v4 as uuidv4 } from 'uuid';
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

          {product.features ? product.features.map((feature) => (
            <li key={uuidv4()}>
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

Description.defaultProps = {
  product: {
    slogan: '',
    description: '',
    features: null,
  },
};

Description.propTypes = {
  product: PropTypes.shape({
    slogan: PropTypes.string,
    description: PropTypes.string,
    features: PropTypes.arrayOf({
      value: PropTypes.string,
      feature: PropTypes.string,
    }),
  }),

};

export default Description;
