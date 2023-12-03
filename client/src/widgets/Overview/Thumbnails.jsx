import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Thumbnails.module.scss';

function Thumbnails({
  imgs, selectionHandler, currImg, expanded,
}) {
  return (
    <ul className={styles.container}>
      {imgs.map((img, index) => {
        if (index < (expanded ? imgs.length : 5)) {
          return (
            <li
              onClick={() => {
                selectionHandler(index);
              }}
              key={index}
              className={currImg === index ? styles.selected : null}
            >
              <img className={styles.thumbnail} src={img.thumbnail_url} alt="test" />
              <div />
            </li>
          );
        }
      })}
      <li>
        {!expanded && <ExpandMoreIcon className={styles.icon} />}
      </li>

    </ul>
  );
}

export default Thumbnails;
