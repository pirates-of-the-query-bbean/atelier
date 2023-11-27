import React, { useEffect } from 'react';
import Question from './Question.jsx';

function QuestionList({
  product,
  questionArr,
  setQuestionArr,
  questionsStartIndex,
  answersStartIndex,
  setAnswersStartIndex,
  sort,
  showTwoMoreItems
}) {
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
  };

  useEffect(() => {
    // getQuestions(product._id);
    sort(questionArr, setQuestionArr, 'question_helpfulness');
  }, []);

  return (
    <section>
      {questionArr.slice(0, questionsStartIndex + 1).map((question) => (
        <Question
          key={question.question_id}
          question={question}
          sort={sort}
          answersStartIndex={answersStartIndex}
          setAnswersStartIndex={setAnswersStartIndex}
          showTwoMoreItems={showTwoMoreItems}
        />
      ))}
    </section>
  );
}

export default QuestionList;
