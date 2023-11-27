import React from 'react';
import styles from './ProductStyle.module.scss';
import FiveStars from '../../sharedComponents/fiveStars/FiveStars';
import Style from './Style';

function ProductStyle({
  product, productStyles, currStyle, setCurrStyle,
}) {
  if (currStyle === null || currStyle === undefined) {
    currStyle = { name: 'Select a style' };
  }
  return (
    <div className={styles.container}>
      <h3>
        {'STYLE > '}
        <span>{currStyle.name}</span>
      </h3>
      <div className={styles.styleList}>
        {productStyles.map((style, index) => (
          <Style
            setCurrStyle={setCurrStyle}
            style={style}
            key={index}
            selected={style.style_id === currStyle.style_id}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductStyle;
