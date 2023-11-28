import React, {useState} from 'react';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import ParsedDate from '../../sharedComponents/ParsedDate';
import styles from './Answer.module.scss';

function Answer({ answer, upvote, report }) {
  const {id, body, date, answerer_name, helpfulness, photos} = answer;

  return (
    <section className={styles.answer__container}>
      <h5 className={styles.answer__heading}>
        A:
        <span className={styles.answer__body}>{body}</span>
      </h5>
      <div className={styles.answer__meta}>
        <p>
          {answerer_name === 'Seller' ? (
            <span>by <b>Seller,</b>
              <ParsedDate date={answer.date} />
            </span>
          ) : (
            <span>by
               {answerer_name},
              <ParsedDate date={answer.date} />
            </span>
          )}
        </p>
        <p>
          <UpvoteLink item={answer} itemType="answer" property="helpfulness" />
        </p>
        <p>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              report('answer', { id });
            }}
          >
            Report
          </button>
        </p>
      </div>
    </section>
  );
}

export default Answer;
