import React from 'react';
import styles from './GalleryImg.module.scss';

function GalleryImg({ src, expandImg }) {
  return (
    <div
      className={styles.container}
    >
      <img
        src={src}
        alt="a camo onsie"
      />
    </div>
  );
}

export default GalleryImg;
