import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import styles from './Answer.module.scss';
import axios from 'axios';

function AnswerList({
  question, helpful, report, sort, answersStartIndex, setAnswersStartIndex, showTwoMoreItems
}) {
  const [answerArr, setAnswerArr] = useState([]);
  console.log(question.question_id);
  function getAnswers(id) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers`)
      .then((data) => {
        console.log(data);
        setAnswerArr(data.results);
        // sort(data.results, setAnswerArr, 'helpfulness');
      })
      .catch((err) => {
        console.log('error fetching answers ', err);
      });
  }

  useEffect(() => {
    getAnswers(question.question_id);
  }, []);

  return (
    <section>
      {answerArr.slice(0, answersStartIndex + 2).map((answer, index) => (
        <Answer key={index} answer={answer} helpful={helpful} report={report} />
      ))}
      {answerArr.length > (answersStartIndex - 1) && (
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
      )}
    </section>
  );
}

export default AnswerList;
