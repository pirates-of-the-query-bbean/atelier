import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QuestionList ({ product, questionArr, setQuestionArr }) {
  const [startQuestionsIndex, setStartQuestionsIndex] = useState(0);
  const [startAnswersIndex, setStartAnswersIndex] = useState(0);

  function showTwoMoreItems(arrToFilter) {
    setStartIndex(startIndex, 2);
  }

  const getQuestions = () => {
    // axios.get(`/questions/${product_id}/`)
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

  return (
    <section>
      <h2>Question List</h2>
      <Question />
    </section>
  )
}

export default QuestionList;