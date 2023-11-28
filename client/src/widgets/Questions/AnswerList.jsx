import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import styles from './Answer.module.scss';
import axios from 'axios';

function AnswerList({
  question, helpful, report, sort, answersStartIndex, setAnswersStartIndex, showTwoMoreItems
}) {
  const [answerArr, setAnswerArr] = useState([]);

  function getAnswers(question_id) {
    // axios.get(`/qa/questions/${question_id}/answers`)
    //   .then((data) => {
    //     const answers = Object.values(data.data);
    //     sort(answers, setAnswerArr, 'helpfulness');
    //     setAnswerArr(answers);
    //   })
    //   .catch((err) => {
    //     console.log('error fetching answers');
    //   });
  }

  function getAnswers2(answerObj) {
    const answers = Object.values(answerObj);
    sort(answers, setAnswerArr, 'helpfulness');
  }

  const testAnswer = {
    73: {
      "id": 73,
      "body": "Last of the seams started splitting the first time I wore it!",
      "date": "2019-11-28T00:00:00.000Z",
      "answerer_name": "sillyguy",
      "helpfulness": -6,
      "photos": [],
    },
    78: {
      "id": 78,
      "body": "First 9 lives",
      "date": "2019-11-12T00:00:00.000Z",
      "answerer_name": "iluvdogz",
      "helpfulness": 31,
      "photos": [],
    },
    70: {
      "id": 70,
      "body": "Six of the seams started splitting the first time I wore it!",
      "date": "2019-11-28T00:00:00.000Z",
      "answerer_name": "sillyguy",
      "helpfulness": 6,
      "photos": [],
    },
    82: {
      "id": 82,
      "body": "Second of the seams started splitting the first time I wore it!",
      "date": "2019-11-28T00:00:00.000Z",
      "answerer_name": "Seller",
      "helpfulness": 8,
      "photos": [],
    },
  };

  useEffect(() => {
    getAnswers2(testAnswer);
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
