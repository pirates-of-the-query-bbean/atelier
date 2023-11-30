import React from 'react';
import PropTypes from 'prop-types';
import styles from './GalleryImg.module.scss';

function GalleryImg({ src }) {
  return (
    <div className={styles.container}>
      <img src={src} alt="a camo onsie" />
    </div>
  );
}

GalleryImg.propTypes = {
  src: PropTypes.string.isRequired,
};

export default GalleryImg;
