import React, {useState} from 'react';
import styles from './Upvote.module.scss';

// Because various components have different keys, pass in key along with object to upvote a particular property.
// <Helpful item={questionObj/answerObj/reviewObj} property={helpfulnessKey}/>

const UpvoteLink = ({item, property}) => {

  const [upvoteCount, setUpvoteCount] = useState(item[property]);

  const upvote = (item, property) => {
    var userVoted = false;

    return (item, property) => {
      if (!userVoted) {
        setUpvoteCount(item[property]+= 1);
        userVoted = true;
      } else {
        console.log('You can only upvote this item once.')
      }
    }

  }

  return (
    <div className={styles.upvote__container}>
      <span>Helpful? </span>
      <a href='#' onClick={(e)=> {
        e.preventDefault();
        upvote(item, property);
      }}>Yes</a>
      <span>({upvoteCount}) </span>
    </div>
  )

}

export default UpvoteLink