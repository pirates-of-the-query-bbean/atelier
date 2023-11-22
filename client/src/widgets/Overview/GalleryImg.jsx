import React from 'react';
import styles from './GalleryImg.module.scss';

function GalleryImg({ src }) {
  return (
    <div>
      <img src={src} alt="a camo onsie" />
    </div>
  );
}

export default GalleryImg;
