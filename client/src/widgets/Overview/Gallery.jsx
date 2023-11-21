import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import styles from './Gallery.module.scss';
import Thumbnails from './Thumbnails';

function Gallery({ product }) {
  return (
    <div className={styles.container}>
      <Thumbnails />
      <nav>
        <FullscreenIcon className={styles.fullscreen} />
        <div>
          <ArrowBackIcon />
          <ArrowForwardIcon />
        </div>
        <div />
      </nav>
    </div>
  );
}

export default Gallery;
