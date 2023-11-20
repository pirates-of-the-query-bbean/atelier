import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';
import styles from './Question.module.scss';

function Question({ question, upvote }) {
  const { question_body, question_date, asker_name, question_helpfulness, answers, reported} = question;

  useEffect(() => {

  }, [])

  return (
    <section className={styles.question__container}>
      <h5 className={styles.question__heading}>Q:
        <span className={styles.question__body}>{question_body}</span>
        <div className={styles.question__header_input}>
          <span className={styles.upvote}>Helpful?
            <a href='#'>Yes</a>({question_helpfulness})
          </span>
          <span className={styles.addAnswer}>
            <a href='#' onClick={(e) => console.log('clicked')}>Add Answer</a>
        </span>
        </div>
      </h5>
      <AnswerList upvote={upvote}/>
    </section>
  )
}

export default Question;