import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import styles from './Question.module.scss';

function QuestionList({
  currentProduct,
  questionArr,
  setQuestionStartIndex,
  questionsStartIndex,
  showMoreItems,
}) {
  if (questionArr.length === 0) {
    return (
      <p className={styles.question__placeholder}>There are no questions for this product yet.</p>
    );
  }

  console.log(showMoreItems, setQuestionStartIndex);

  const handleScrollCapture = (event) => {
    const yTraveled = event.target.scrollTop;
    const containerHeight = event.target.scrollHeight - event.target.clientHeight;
    const hitLimit = yTraveled >= containerHeight * .80;

    if (hitLimit) {
      showMoreItems(setQuestionStartIndex, questionsStartIndex, 10);
    } else {
      console.log('Scroll event during capturing phase:', yTraveled, containerHeight);
    }
  };

  useEffect(() => {

  }, []);
  return (
    <section className={styles.questionsArray} onScrollCapture={handleScrollCapture}>
      {questionArr.slice(0, questionsStartIndex + 1).map((question) => (
        <Question
          currentProduct={currentProduct}
          key={question.question_id}
          question={question}
          showMoreItems={showMoreItems}
        />
      ))}
    </section>
  );
}

QuestionList.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    campus: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  questionArr: PropTypes.arrayOf(PropTypes.shape({
    answer_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  })).isRequired,
  questionsStartIndex: PropTypes.number.isRequired,
  showMoreItems: PropTypes.func.isRequired,
  setQuestionStartIndex: PropTypes.func.isRequired,
};

export default QuestionList;
