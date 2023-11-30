import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Gallery.module.scss';
import Thumbnails from './Thumbnails';
import GalleryImg from './GalleryImg';

function Gallery({ currStyle, expandImg }) {
  const [currImg, setCurrImg] = useState(0);
  const [isExpanded, setExpanded] = useState(false);
  const [isZoomed, setZoomed] = useState(false);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
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

  const handleClick = (e) => {
    console.log(e.target.classList);
    if (e.target.classList.contains('img')) {
      if (isExpanded) {
        setZoomed(!isZoomed);
      }
      if (!isExpanded) {
        setExpanded(true);
      }
    }
    if (e.target.classList.contains('background')) {
      setExpanded(false);
      setZoomed(false);
    }
  };

  const pointerHandler = (e) => {
    // console.log(window.getComputedStyle(e.target).width, (window.getComputedStyle(e.target).height));
    if (isZoomed && e.target.classList.contains('img')) {
      const pgWidth = e.view.innerWidth;
      const pgHeight = e.view.innerHeight;
      const imgWidth = Number(window.getComputedStyle(e.target).width.slice(0, -2)) * 2.5;
      const imgHeight = Number(window.getComputedStyle(e.target).height.slice(0, -2)) * 2.5;
      const travelX = Math.max(0, imgWidth - pgWidth);
      const travelY = Math.max(0, imgHeight - pgHeight);

      const xPercent = (e.clientX / pgWidth) * 2 - 1;
      const yPercent = (e.clientY / pgHeight) * 2 - 1;

      console.log(xPercent, yPercent);

      // console.log('X:', Math.floor((e.clientX / e.view.innerWidth) * 100), 'Y:', Math.floor((e.clientY / e.view.innerHeight) * 100));
      setXPos(travelX * xPercent);
      setYPos(travelY * yPercent);
    }
  };

  if (currStyle === null) {
    return <h2>Select a Style</h2>;
  }

  return (
    <div data-testid="gallery" className={`${styles.container} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.overlay}>
        <Thumbnails selectionHandler={changeImg} imgs={currStyle.photos} currImg={currImg} />
        <nav id="nav" onClick={handleClick}>
          {isExpanded ? (
            <CloseIcon
              onClick={() => {
                setExpanded(!isExpanded);
                setZoomed(false);
              }}
              className={`${styles.fullscreen} ${styles.icon}`}
            />
          ) : (
            <FullscreenIcon
              onClick={() => {
                setExpanded(!isExpanded);
                setZoomed(false);
              }}
              className={`${styles.fullscreen} ${styles.icon}`}
            />
          )}
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
      <div
        onPointerMove={pointerHandler}
        onClick={handleClick}
        data-testid="gallery-img"
        style={{ transform: `translateX(-${currImg * (100 / currStyle.photos.length)}%)` }}
        className={`${styles.imgs} ${isZoomed ? styles.zoomed : ''}`}
      >
        {currStyle.photos.map((img) => (
          <GalleryImg
            xPos={xPos}
            yPos={yPos}
            isZoomed={isZoomed}
            key={uuidv4()}
            src={img.url}
          />
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
