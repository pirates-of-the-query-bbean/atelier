import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnswerList from './AnswerList';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import AddAnswerModal from './Modals/AddAnswerModal';
import styles from './Question.module.scss';

function Question({
  currentProduct,
  question,
  showTwoMoreItems,
}) {
  const {
    question_id,
    question_body,
    question_date,
    asker_name,
    question_helpfulness,
    answers,
    reported
  } = question;

  const [isAddAnswerModalOpen, setAddAnswerModalOpen] = useState(false);
  const [answerArr, setAnswerArr] = useState([]);
  const [answersStartIndex, setAnswersStartIndex] = useState(2);

  function getAnswers(id) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${id}/answers`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((data) => {
        setAnswerArr(data.data.results);
      })
      .catch((err) => {
        console.log('error fetching answers ', err);
      });
  }

  function openAddAnswerModal() {
    setAddAnswerModalOpen(true);
  }

  function closeAddAnswerModal() {
    setAddAnswerModalOpen(false);
  }

  function addAnswer(data, questionID) {
    axios({
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionID}/answers`,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        body: data.body,
        name: data.name,
        email: data.email
      },
    })
      .then((response) => {
        getAnswers(questionID);
      })
      .catch((err) => {
        console.log('Error posting answer', err);
      });
    closeAddAnswerModal();
  }

  function report(itemType, id) {
    let reportURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa';
    let param = '';

    if (itemType === 'question') {
      reportURL += `/questions/${id}/report`;
      param = 'question_id';
    } else {
      reportURL += `/answers/${id}/report`;
      param = 'answer_id';
    }

    axios({
      method: 'put',
      url: reportURL,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        [param]: id,
      },
    })
      .then(() => {
        getAnswers(question_id);
      })
      .catch((err) => {
        console.log('error reporting answer', err);
      });
  }

  return (
    <section className={styles.question__container} data-testid="question">
      <h5 className={styles.question__heading}>
        Q:
        <span className={styles.question__body}>{question_body}</span>
        <div className={styles.question__header_input}>
          <UpvoteLink
            item={question}
            itemType="question"
            id={question_id}
            property="question_helpfulness"
          />
          <span className={styles.addAnswer}>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                openAddAnswerModal();
              }}
            >
              Add Answer
            </button>
          </span>
        </div>
      </h5>
      <AnswerList
        answerArr={answerArr}
        question={question}
        report={report}
        showTwoMoreItems={showTwoMoreItems}
        getAnswers={getAnswers}
        answersStartIndex={answersStartIndex}
        setAnswersStartIndex={setAnswersStartIndex}
      />
      <AddAnswerModal
        currentProduct={currentProduct}
        question={question}
        isAddAnswerModalOpen={isAddAnswerModalOpen}
        onSubmit={addAnswer}
      />
    </section>
  );
}
// Question.propTypes = {
//   question: PropTypes.shape({

//   }),
//   upvote: PropTypes.function,
//   sort: PropTypes.function,
//   answersStartIndex: PropTypes.number,
//   setAnswersStartIndex: PropTypes.function,
//   showTwoMoreItems: PropTypes.function,
// };

export default Question;
