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
  let upvoteURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
  let param = '';

  if (itemType === 'review') {
    upvoteURL += `reviews/?${item.id}/helpful`;
    param = 'review_id';
  } else if (itemType === 'answer') {
    upvoteURL += `qa/answers/?${item.id}/helpful`;
    param = 'answer_id';
  } else {
    upvoteURL += `qa/questions/?${item.id}/helpful`;
    param = 'question_id';
  }

  const upvote = (obj, key) => {
    axios({
      method: 'put',
      url: upvoteURL,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        param: obj.id,
      },
    });

    const upvoteObj = obj;
    setUpvoteCount(upvoteObj[key] += 1);
  };

  return (
    <div className={styles.upvote__container} data-testid="upvoteLink">
      <span>Helpful? </span>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          upvote(item, itemType, property);
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
