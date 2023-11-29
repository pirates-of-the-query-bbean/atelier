import React from 'react';
import styles from './Answer.module.scss';
import ParsedDate from '../../sharedComponents/ParsedDate';

function Answer({ answer, upvote, report }) {
  const {body, date, answerer_name, helpfulness, photos} = answer;

  return (
    <section className={styles.answer__container}>
      <h5 className={styles.answer__heading}>A:
        <span className={styles.answer__body}>{body}</span>
      </h5>
        <div className={styles.answer__meta}>
          <p>
            by {answerer_name}
            {answerer_name === 'Seller' ? (
              <span> -<b>Seller,</b> {formattedDate(answer.date)}</span>
            ) : (<span>, {formattedDate(answer.date)}</span>)}
          </p>
          <p>
            <span className={styles.upvote}>Helpful?</span>
            <a href='#' onClick={(e)=> {
              e.preventDefault();
              upvote(e);
            }}>Yes</a>
            <span>({helpfulness})</span>
          </p>
          <p>
            <a href='#' onClick={(e)=> {
              e.preventDefault();
              report(movie);
            }}>Report</a>
          </p>
        </div>
    </section>
  )

}

export default Answer;