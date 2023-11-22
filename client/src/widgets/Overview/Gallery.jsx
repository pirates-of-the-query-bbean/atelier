import React, { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import styles from './Gallery.module.scss';
import Thumbnails from './Thumbnails';
import GalleryImg from './GalleryImg';

function Gallery({ currStyle }) {
  console.log(currStyle, 'CURR STYLE');
  const [currImg, setCurrImg] = useState(0);
  const changeImg = (dir) => {
    if (dir === 'forward' && currImg < 4) {
      setCurrImg(currImg + 1);
    }
    if (dir === 'back' && currImg > 0) {
      setCurrImg(currImg - 1);
    }
  };

  const thumbnail = () => {

  };
  if (currStyle === null) {
    return <h2>Select a Style</h2>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <Thumbnails />
        <nav>
          <FullscreenIcon className={`${styles.fullscreen} ${styles.icon}`} />
          <div>
            <ArrowBackIcon
              className={styles.icon}
              onClick={() => {
                changeImg('back');
              }}
            />
            <ArrowForwardIcon
              className={styles.icon}
              onClick={() => {
                changeImg('forward');
              }}
            />
          </div>
          <div />
        </nav>
      </div>
      <div style={{ transform: `translateX(-${currImg * (100 / currStyle.photos.length)}%)` }} className={styles.imgs}>
        {currStyle ? currStyle.photos.map((img, index) => (
          <GalleryImg src={img.url} />
        )) : null}
      </div>
    </div>
  );
}

export default Gallery;
