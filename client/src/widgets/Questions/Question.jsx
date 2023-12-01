import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnswerList from './AnswerList';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import AddAnswerModal from './Modals/AddAnswerModal';
import styles from './Question.module.scss';

function Question({
  currentProduct, question, showTwoMoreItems,
}) {
  const { question_id, question_body } = question;

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
      .then(() => {
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
Question.propTypes = {
  question: PropTypes.shape({
    question_id: PropTypes.number.isRequired,
    question_body: PropTypes.string.isRequired,
    question_date: PropTypes.string.isRequired,
    asker_name: PropTypes.string.isRequired,
    question_helpfulness: PropTypes.number.isRequired,
    reported: PropTypes.bool.isRequired,
    answers: PropTypes.arrayOf(PropTypes.shape({
      answer_id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      answerer_name: PropTypes.string.isRequired,
      helpfulness: PropTypes.number.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
    })).isRequired,
  }).isRequired,
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    campus: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  showTwoMoreItems: PropTypes.func.isRequired,
};

export default Question;
