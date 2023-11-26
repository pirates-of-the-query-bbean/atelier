import React, { useState } from 'react';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key along with
// object to upvote a particular property.
// EXAMPLE USAGE: <UpvoteLink item={questionObj/answerObj/reviewObj} property={helpfulnessKey}/>

function UpvoteLink({ item, property }) {
  const [upvoteCount, setUpvoteCount] = useState(item[property]);

  const upvote = (obj, key) => {
    setUpvoteCount(obj[key] += 1);
  };

  return (
    <div className={styles.upvote__container}>
      <span>Helpful? </span>
      <a href='#'
        onClick={(e)=> {
        e.preventDefault();
        upvote(item, property);
      }}
      >
        Yes
      </a>
      <span>
        (
        {upvoteCount}
        )
      </span>
    </div>
  );
}

export default UpvoteLink;
