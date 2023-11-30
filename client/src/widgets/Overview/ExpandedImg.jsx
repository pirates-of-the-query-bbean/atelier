import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExpandedImg.module.scss';

function ExpandedImg({ src, expandImg }) {
  return (
    <div onClick={expandImg} className={styles.container}>
      <img src={src} alt="a camo onsie" />
    </div>
  );
}

ExpandedImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default ExpandedImg;
