import React, {useState} from 'react';
import Question from './Question.jsx';

const QuestionList = ({ product }) => {
  const [questionArr, setQuestionArr] = useState([]);

  const getQuestions = () => {
    axios.fetch('/questions')
      .then((data) => {
        const questions = [];

        for (let key in data.data) {
          questions.push(answerObj[key]);
        }
        setQuestionArr(questions);
      })
      .catch((err) => {
        console.log('error fetching questions');
      });
  }

  return (
    <section>
      <h2>Question List</h2>
      <Question />
    </section>
  )
}

export default QuestionList;