import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Answer from './Answer';
import styles from './Answer.module.scss';

function AnswerList({
  question, showTwoMoreItems,
  answerArr, answersStartIndex, setAnswersStartIndex, getAnswers,
}) {
  useEffect(() => {
    getAnswers(question.question_id);
  }, []);

  return (
    <section>
      {answerArr.slice(0, answersStartIndex).map((answer) => (
        <Answer
          key={uuidv4()}
          answer={answer}
        />
      ))}
      <button
        type="submit"
        className={styles.loadMoreAnswers}
        onClick={(e) => {
          e.preventDefault();
          showTwoMoreItems(setAnswersStartIndex, answersStartIndex);
        }}
      >
        See More Answers
      </button>
    </section>
  );
}

AnswerList.propTypes = {
  question: PropTypes.shape({

    }).isRequired,
  showTwoMoreItems: PropTypes.isRequired,
  answerArr: PropTypes.isRequired,
  answersStartIndex: PropTypes.isRequired,
  setAnswersStartIndex: PropTypes.isRequired,
  getAnswers: PropTypes.isRequired,
}
export default AnswerList;
