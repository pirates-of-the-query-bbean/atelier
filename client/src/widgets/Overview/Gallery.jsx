import React, { useState, useEffect } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import styles from './Gallery.module.scss';
import Thumbnails from './Thumbnails';
import GalleryImg from './GalleryImg';

function Gallery({ currStyle }) {
  const [currImg, setCurrImg] = useState(0);
  const changeImg = (dir) => {
    if (dir === 'forward' && currImg < (currStyle.photos.length - 1)) {
      setCurrImg(currImg + 1);
    }
    if (dir === 'back' && currImg > 0) {
      setCurrImg(currImg - 1);
    }
    if (typeof dir === 'number') {
      setCurrImg(dir);
    }
  };

  if (currStyle === null) {
    return <h2>Select a Style</h2>;
  }

  return (
    <div data-testid="gallery" className={styles.container}>
      <div className={styles.overlay}>
        <Thumbnails selectionHandler={changeImg} imgs={currStyle.photos} currImg={currImg} />
        <nav>
          <FullscreenIcon className={`${styles.fullscreen} ${styles.icon}`} />
          <div className={styles.arrows}>
            <div className={styles.icon}>
              {currImg > 0 && (
              <ArrowBackIcon
                data-testid="back-arrow"
                onClick={() => {
                  changeImg('back');
                }}
              />
              )}
            </div>
            <div className={styles.icon}>
              {currImg < (currStyle.photos.length - 1) && (
              <ArrowForwardIcon
                data-testid="next-arrow"
                onClick={() => {
                  changeImg('forward');
                }}
              />
              )}
            </div>
          </div>
          <div />
        </nav>
      </div>
      <div data-testid="gallery-img" style={{ transform: `translateX(-${currImg * (100 / currStyle.photos.length)}%)` }} className={styles.imgs}>
        {currStyle.photos.map((img, i) => (
          <GalleryImg key={i} src={img.url} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
