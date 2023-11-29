import React, { useState, useEffect } from 'react';
import Answer from './Answer';
import styles from './Answer.module.scss';
import axios from 'axios';

function AnswerList({
  question, helpful, report, sort, answersStartIndex, setAnswersStartIndex, showTwoMoreItems
}) {
  const [answerArr, setAnswerArr] = useState([]);

  function getAnswers(id) {
    axios.get(`/qa/questions/?question_id=${id}/answers`)
      .then((data) => {
        console.log(data);
        const answers = Object.values(data.data);
        setAnswerArr(answers);
        sort(answers, setAnswerArr, 'helpfulness');
      })
      .catch((err) => {
        console.log('error fetching questions');
      });
  }

  useEffect(() => {
    getAnswers(question.id);
  }, []);

  return (
    <section>
      {answerArr.slice(0, answersStartIndex + 2).map((answer, index) => {
        return (
          <Answer key={index} answer={answer} helpful={helpful} report={report}/>
          )}
        )}
      <a href='#'
        className={styles.loadMoreAnswers}
        onClick={(e) => {
          showTwoMoreItems(setAnswersStartIndex, answersStartIndex);
        }}>See More Answers</a>
    </section>
  );
}

export default AnswerList;
