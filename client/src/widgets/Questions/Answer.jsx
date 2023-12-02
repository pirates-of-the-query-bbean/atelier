import React from 'react';
import PropTypes from 'prop-types';
import UpvoteLink from '../../sharedComponents/upvoteLink/UpvoteLink';
import ParsedDate from '../../sharedComponents/ParsedDate';
import ReportButton from '../../sharedComponents/reportButton/ReportButton';
import styles from './Answer.module.scss';

function Answer({ answer }) {
  const {answer_id, body, date, answerer_name, photos} = answer;

  return (
    <section className={styles.answer__container} data-testid="answer">
      <h5 className={styles.answer__heading}>
        A:
        <span className={styles.answer__body}>{body}</span>
      </h5>
      <div className={styles.answer__meta}>
        <p>
          {answerer_name === 'Seller' ? (
            <span>by <b>Seller, </b>
              <ParsedDate date={date} />
            </span>
          ) : (
            <span>
              by {answerer_name}, <ParsedDate date={date} />
            </span>
          )}
        </p>
        <p>
          <UpvoteLink item={answer} itemType="answer" id={answer_id} property="helpfulness" />
        </p>
        <ReportButton itemType="answer" id={answer_id}/>
      </div>
    </section>
  );
}

Answer.propTypes = {
  answer: PropTypes.shape({
    answer_id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    answerer_name: PropTypes.string.isRequired,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Answer;
