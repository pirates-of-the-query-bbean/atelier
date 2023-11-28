import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from './SocialShare.module.scss';

function SocialShare() {
  return (
    <ul className={styles.container}>
      <li>
        <a aria-label="Twitter Link" target="_blank" href="https://www.twitter.com" rel="noreferrer">
          <TwitterIcon />
        </a>
      </li>
      <li>
        <a aria-label="Pintrest Link" target="_blank" href="https://www.pintrest.com" rel="noreferrer">
          <PinterestIcon />
        </a>
      </li>
      <li>
        <a aria-label="Facebook Link" target="_blank" href="https://www.facebook.com/" rel="noreferrer">
          <FacebookIcon />
        </a>
      </li>

    </ul>
  );
}

export default SocialShare;
