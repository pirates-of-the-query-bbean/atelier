import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Answer from './Answer.jsx';
import styles from './Answer.module.scss';
import axios from 'axios';

function AnswerList({
  question, helpful, report, showTwoMoreItems,
  answerArr, answersStartIndex, setAnswersStartIndex, getAnswers,
}) {
  useEffect(() => {
    getAnswers(question.question_id);
  }, []);

  return (
    <section>
      {answerArr.slice(0, answersStartIndex).map((answer) => (
        <Answer key={uuidv4()} answer={answer} helpful={helpful} report={report} />
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

export default AnswerList;
