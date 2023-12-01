import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key
// along with object to upvote a particular property.
// EXAMPLE USAGE: <UpvoteLink
//  itemType={'review', 'answer', 'question'}
//  id={item_id}/>

function UpvoteLink({ item, itemType, id, property }) {
  const [upvoteCount, setUpvoteCount] = useState(0);

  const upvote = (type, itemID) => {
    let upvoteURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/';
    let param = '';

    if (type === 'review') {
      upvoteURL += `reviews/${itemID}/helpful`;
      param = 'review_id';
    } else if (type === 'answer') {
      upvoteURL += `qa/answers/${itemID}/helpful`;
      param = 'answer_id';
    } else if (type === 'question') {
      upvoteURL += `qa/questions/${itemID}/helpful`;
      param = 'question_id';
    }

    axios({
      method: 'put',
      url: upvoteURL,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        [param]: itemID,
      },
    })
      .then((response) => {
        setUpvoteCount(item[property] += 1);
      })
      .catch((err) => {
        console.log('error upvoting: ', err);
      });
  };

  useEffect(() => {
    if (item) {
      setUpvoteCount(item[property]);
    }
  }, [item]);

  return (
    <div className={styles.upvote__container} data-testid="upvoteLink">
      <span>Helpful? </span>
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          upvote(itemType, id);
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

// UpvoteLink.propTypes = {
//   itemType: PropTypes.string.isRequired,
//   id: PropTypes.number.isRequired,
// };

export default UpvoteLink;
