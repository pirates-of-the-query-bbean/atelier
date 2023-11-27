import React, { useState } from 'react';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key along with object to upvote a particular property.
//EXAMPLE USAGE: <UpvoteLink item={questionObj/answerObj/reviewObj} property={helpfulnessKey}/>

const UpvoteLink = function ({ item, property }) {
  const [upvoteCount, setUpvoteCount] = useState(item[property]);

  const upvote = (item, property) => {
    setUpvoteCount(item[property] += 1);
  };


  return (
    <div className={styles.upvote__container}>
      <span>Helpful? </span>
      <a href='#' onClick={(e) => {
        e.preventDefault();
        upvote(item, property);
      }}>
        Yes
      </a>
      <span>({upvoteCount}) </span>
    </div>
  )

}

export default UpvoteLink