import React, { useState, useEffect } from 'react';
import Question from './Question.jsx';

function QuestionList ({ product, questionArr, setQuestionArr, questionsStartIndex, sortQuestions }) {

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

  function sort(arr, setState, property) {
    const sortedArr = [...arr].sort((a, b) => b[property] - a[property]);
    setState(sortedArr);
  }

  useEffect(() => {
    sort(questionArr, setQuestionArr, 'question_helpfulness');
  }, []);

  return (
    <section>
      {questionArr.slice(0, questionsStartIndex + 1).map((question) => {
        return(
          <Question key={question.question_id} question={question} />
        )
      })}
    </section>
  )
}

export default QuestionList;