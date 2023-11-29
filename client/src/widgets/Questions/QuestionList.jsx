import React from 'react';
import Question from './Question';
import styles from './Question.module.scss';

function QuestionList({
  currentProduct,
  questionArr,
  questionsStartIndex,
  answersStartIndex,
  setAnswersStartIndex,
  sort,
  showTwoMoreItems
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
          sort={sort}
          answersStartIndex={answersStartIndex}
          setAnswersStartIndex={setAnswersStartIndex}
          showTwoMoreItems={showTwoMoreItems}
        />
      ))}
    </section>
  );
}

export default QuestionList;
