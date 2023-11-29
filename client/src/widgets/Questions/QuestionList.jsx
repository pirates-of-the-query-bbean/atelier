import React from 'react';
import Question from './Question';
import styles from './Question.module.scss';

function QuestionList({
  currentProduct,
  questionArr,
  questionsStartIndex,
  showTwoMoreItems,
}) {
  if (questionArr.length === 0) {
    return (
      <p className={styles.question__placeholder}>There are no questions for this product yet.</p>
    );
  }

  return (
    <section>
      {questionArr.slice(0, questionsStartIndex + 1).map((question) => (
        <Question
          currentProduct={currentProduct}
          key={question.question_id}
          question={question}
          showTwoMoreItems={showTwoMoreItems}
        />
      ))}
    </section>
  );
}

export default QuestionList;
