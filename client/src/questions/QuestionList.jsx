import React, {useState} from 'react';
import Question from './Question.jsx';

const QuestionList = ({ product }) => {
  const [questionArr, setQuestionArr] = useState([]);

  return (
    <section>
      <h2>Question List</h2>
      <Question />
    </section>
  )
}

export default QuestionList;