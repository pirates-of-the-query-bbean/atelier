import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import styles from './Gallery.module.scss';
import Thumbnails from './Thumbnails';
import GalleryImg from './GalleryImg';

function Gallery({ currStyle, expandImg }) {
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
          <FullscreenIcon
            onClick={() => {
              expandImg(currImg);
            }}
            className={`${styles.fullscreen} ${styles.icon}`}
          />
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
        {currStyle.photos.map((img) => (
          <GalleryImg key={uuidv4()} src={img.url} />
        ))}
      </div>
    </div>
  );
}

Gallery.propTypes = {
  currStyle: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      thumbnail_url: PropTypes.string,
    })),
  }).isRequired,
};

export default Gallery;
