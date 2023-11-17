import React, {useState} from 'react';
import AnswerList from './AnswerList.jsx';

const Question = ({ product }) => {
  const [questionArr, setQuestionArr] = useState([]);
  const [AnswerArrayArr, setAnswerArrayArr] = useState([]);

  const testAnswer = {
    "id": 70,
    "body": "Some of the seams started splitting the first time I wore it!",
    "date": "2019-11-28T00:00:00.000Z",
    "answerer_name": "sillyguy",
    "helpfulness": 6,
    "photos": [],
  }

  return (
    <div className='question__container'>
      <h2>Question Title</h2>
      <p>Here's a list of answers.</p>
      <AnswerList answer={testAnswer}/>
    </div>
  )
}

export default Question;