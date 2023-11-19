import React, {useState, useEffect} from 'react';
import AnswerList from './AnswerList.jsx';

function Question({ product, upvote }) {


  useEffect(() => {

  }, [])

  return (
    <div className='question__container'>
      <h2>Question Title</h2>
      <p>Here's a list of answers.</p>
      <AnswerList upvote={upvote}/>
    </div>
  )
}

export default Question;