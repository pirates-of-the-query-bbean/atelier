import React from 'react';
import PropTypes from 'prop-types';
import styles from './GalleryImg.module.scss';
// style={isZoomed ? { transform: `translateX(${xPos}px) translateY(${yPos}px) scale(2)` } : {}}
function GalleryImg({
  src, xPos, yPos, isZoomed,
}) {
  return (
    <div
      className={`${styles.container} background`}
    >
      <img
        style={isZoomed ? { transform: `translateX(${-xPos / 2}px) translateY(${-yPos / 2}px) scale(2.5)` } : {}}
        className="img"
        src={src}
        alt="a camo onsie"
      />
    </div>
  );
}

GalleryImg.defaultProps = {
  xPos: 0,
  yPos: 0,
  isZoomed: false,
};

GalleryImg.propTypes = {
  src: PropTypes.string.isRequired,
  xPos: PropTypes.number,
  yPos: PropTypes.number,
  isZoomed: PropTypes.bool,
};

export default GalleryImg;
