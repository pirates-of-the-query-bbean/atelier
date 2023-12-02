import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Answer from './Answer';
import styles from './Answer.module.scss';

function AnswerList({
  question, showMoreItems,
  answerArr, answersStartIndex, setAnswersStartIndex, getAnswers,
}) {
  const [dynamicButtonText, setDynamicButtonText] = useState('See More Answers');

  function handleOnClick(buttonText) {
    if (buttonText === 'See More Answers') {
      showMoreItems(setAnswersStartIndex, answersStartIndex, answerArr.length);
      setDynamicButtonText('Collapse Answers');
    } else {
      setAnswersStartIndex(2);
      setDynamicButtonText('See More Answers');
    }
  }

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
      {answerArr.length > 2 && (
        <button
          type="submit"
          className={styles.loadMoreAnswers}
          onClick={(e) => {
            e.preventDefault();
            handleOnClick(dynamicButtonText);
          }}
        >
          {dynamicButtonText}
        </button>
      )}
    </section>
  );
}

AnswerList.propTypes = {
  question: PropTypes.shape({

  }).isRequired,
  showMoreItems: PropTypes.func.isRequired,
  answerArr: PropTypes.arrayOf(PropTypes.shape({
    answer_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  answersStartIndex: PropTypes.number.isRequired,
  setAnswersStartIndex: PropTypes.func.isRequired,
  getAnswers: PropTypes.func.isRequired,
};

export default AnswerList;
