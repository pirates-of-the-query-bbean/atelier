import React, {useState, useEffect} from 'react';
import Answer from './Answer.jsx';
import axios from 'axios';

function AnswerList({ question, helpful, report }) {
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
    setAnswerArr(answers);
  }

  const testAnswer = {
    73: {
      "id": 73,
      "body": "Some of the seams started splitting the first time I wore it!",
      "date": "2019-11-28T00:00:00.000Z",
      "answerer_name": "sillyguy",
      "helpfulness": 6,
      "photos": [],
    },
    78: {
      "id": 78,
      "body": "9 lives",
      "date": "2019-11-12T00:00:00.000Z",
      "answerer_name": "iluvdogz",
      "helpfulness": 31,
      "photos": [],
    },
    70: {
      "id": 70,
      "body": "Some of the seams started splitting the first time I wore it!",
      "date": "2019-11-28T00:00:00.000Z",
      "answerer_name": "sillyguy",
      "helpfulness": 6,
      "photos": [],
    },
    82: {
      "id": 82,
      "body": "Some of the seams started splitting the first time I wore it!",
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
    <section className='question__answer--container'>
        {answerArr.map((answer, index) => {
          return (
            <Answer key={index} answer={answer} helpful={helpful} report={report}/>
            )}
          )}
    </section>
  )
}

export default AnswerList;