import React from 'react';
import styles from './Thumbnails.module.scss';

function Thumbnails({ product }) {
  return (
    <ul className={styles.container}>
      <li className={styles.selected}>
        <img className={styles.thumbnail} src="#" alt="test" />
        <div />
      </li>
      <li>
        <img className={styles.thumbnail} src="#" alt="test" />
      </li>
      <li>
        <img className={styles.thumbnail} src="#" alt="test" />
      </li>
      <li>
        <img className={styles.thumbnail} src="#" alt="test" />
      </li>
      <li>
        <img className={styles.thumbnail} src="#" alt="test" />
      </li>

    </ul>
  );
}

export default Thumbnails;
