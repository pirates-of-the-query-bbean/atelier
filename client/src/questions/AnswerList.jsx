import React, {useState} from 'react';
import Answer from './Answer.jsx';

const AnswerList = ({ answer, helpful, report }) => {

  return (
    <div className='question__answer--container'>
      <h2>AnswerList</h2>
      <Answer answer={answer} helpful={helpful} report={report}/>
    </div>
  )
}

export default AnswerList;