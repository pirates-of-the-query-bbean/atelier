import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AnswerList from './AnswerList';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import AddAnswerModal from './Modals/AddAnswerModal';
import styles from './Question.module.scss';

function Question({
  currentProduct,
  setCurrentProduct,
  question,
  upvote,
  sort,
  answersStartIndex,
  setAnswersStartIndex,
  showTwoMoreItems,
}) {
  const {
    question_body,
    question_date,
    asker_name,
    question_helpfulness,
    answers,
    reported
  } = question;

  const [isAddAnswerModalOpen, setAddAnswerModalOpen] = useState(false);
  function openAddAnswerModal() {
    setAddAnswerModalOpen(true);
  }

  function closeAddAnswerModal() {
    setAddAnswerModalOpen(false);
  }

  function report(id, itemType) {
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
        param: id,
      },
    });
  }

  function addAnswer(data, questionID) {
    axios({
      method: 'post',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${questionID}/answers`,
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        body: data.questionBody,
        name: data.nickname,
        email: data.email,
        photos: data.files,
      },
    })
      .then((response) => {
        console.log(response);
        getAnswers();
      })
      .catch((err) => {
        console.log('Error posting answer', err);
      });

    console.log(data);
    closeAddAnswerModal();
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
        question={question}
        upvote={upvote}
        sort={sort}
        report={report}
        answersStartIndex={answersStartIndex}
        setAnswersStartIndex={setAnswersStartIndex}
        showTwoMoreItems={showTwoMoreItems}
      />
      <AddAnswerModal
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
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
