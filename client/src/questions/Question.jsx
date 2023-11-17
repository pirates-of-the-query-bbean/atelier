import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';

const Question = ({ product }) => {
  const [questionArr, setQuestionArr] = useState([]);

  const getAnswers = (answerObj) => {
    const answerArr = [];

    for (let key in answerObj) {
      answerArr.push(answerObj[key]);
    }
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
    }
  }


  useEffect(() => {
    getAnswers(testAnswer);
  }, [])

  return (
    <div className='question__container'>
      <h2>Question Title</h2>
      <p>Here's a list of answers.</p>
      <AnswerList answer={testAnswer}/>
    </div>
  )
}

export default Question;