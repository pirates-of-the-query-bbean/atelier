import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AnswerList from './AnswerList';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import styles from './Question.module.scss';

function Question({
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

  const handleOpenAddAnswerModal = () => {
    setAddAnswerModalOpen(true);
  };

  useEffect(() => {

  }, []);

  return (
    <section className={styles.question__container}>
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
              onSubmit={(e) => {
                e.preventDefault();
                console.log('clicked');
                handleOpenAddAnswerModal();
              }}
            >
              Add Answer
            </button>
          </span>
        </div>
      </h5>
      <AnswerList
        upvote={upvote}
        sort={sort}
        answersStartIndex={answersStartIndex}
        setAnswersStartIndex={setAnswersStartIndex}
        showTwoMoreItems={showTwoMoreItems}
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
