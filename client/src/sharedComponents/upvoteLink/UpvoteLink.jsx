import React, { useState } from 'react';
import axios from 'axios';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key
// along with object to upvote a particular property.
// EXAMPLE USAGE: <UpvoteLink item={questionObj/answerObj/reviewObj} property={helpfulnessKey}/>

function UpvoteLink({ item, itemType, property }) {
  const [upvoteCount, setUpvoteCount] = useState(item[property]);
  let upvoteURL = '';

  if (itemType === 'review') {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${item.id}/helpful`;
  } else if (itemType === 'answer') {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${item.id}/helpful`;
  } else {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${item.id}/helpful`;
  }

  const upvote = (obj, key) => {
    axios({
      method: 'put',
      url: upvoteURL,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    });

    const upvoteObj = obj;
    setUpvoteCount(upvoteObj[key] += 1);
  };

  return (
    <div className={styles.upvote__container}>
      <span>Helpful? </span>
      <button
        type="submit"
        onSubmit={(e) => {
          e.preventDefault();
          upvote(item, property);
        }}
      >
        Yes
      </button>
      <span>
        (
        {upvoteCount}
        )
      </span>
    </div>
  );
}

export default UpvoteLink;
