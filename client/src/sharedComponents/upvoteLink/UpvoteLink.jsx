import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key
// along with object to upvote a particular property.
// EXAMPLE USAGE: <UpvoteLink
//  item={questionObj/answerObj/reviewObj}
//  itemType={'review', 'answer', 'question'}
//  property={helpfulnessKey}/>

function UpvoteLink({ item, itemType, property }) {
  const [upvoteCount, setUpvoteCount] = useState(item[property]);
  let upvoteURL = '';

  if (itemType === 'review') {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/?${item.id}/helpful`;
  } else if (itemType === 'answer') {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/?${item.id}/helpful`;
  } else {
    upvoteURL = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?${item.id}/helpful`;
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
        onClick={(e) => {
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

UpvoteLink.propTypes = {
  item: PropTypes.shape({

  }).isRequired,
  itemType: PropTypes.string.isRequired,
  property: PropTypes.string.isRequired,
};

export default UpvoteLink;
