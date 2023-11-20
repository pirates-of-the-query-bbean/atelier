import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import styles from './Answer.module.scss';
import axios from 'axios';

function AnswerList({ question, helpful, report, sort, answersStartIndex, setAnswersStartIndex, showTwoMoreItems }) {
  const [answerArr, setAnswerArr] = useState([]);

  function getAnswers(question_id) {
    // axios.get(`/qa/questions/${product_id}/answers`)
    //   .then((data) => {
    //     const questions = [];

    //     for (let key in data.data) {
    //       questions.push(answerObj[key]);
    //     }
    //     setQuestionArr(questions);
    //   })
    //   .catch((err) => {
    //     console.log('error fetching questions');
    //   });
  }

  function getAnswers2(answerObj) {
    const answers = [];

    for (let key in answerObj) {
      answers.push(answerObj[key]);

    }
    sort(answers, setAnswerArr, 'helpfulness');
    // setAnswerArr(answers);

    console.log(answerArr);

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
    }
  }


  useEffect(() => {
    getAnswers2(testAnswer);
  }, []);


  return (
    <section>
      {answerArr.slice(0, 2).map((answer, index) => {
        return (
          <Answer key={index} answer={answer} helpful={helpful} report={report}/>
          )}
        )}
      <a href='#'
        className={styles.loadMoreAnswers}
        onClick={(e) => {
          e.preventDefault()
          showTwoMoreItems(setAnswersStartIndex, answersStartIndex)
        }}>Load More Answers</a>
    </section>
  )
}

export default AnswerList;