import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import styles from './Report.module.scss';

function ReportButton({
  itemType, id,
}) {
  const [buttonText, setButtonText] = useState('Report');

  const report = () => {
    let reportURL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa';
    let param = '';

    if (itemType === 'question') {
      reportURL += `/questions/${id}/report`;
      param = 'question_id';
    } else if (itemType === 'answer') {
      reportURL += `/answers/${id}/report`;
      param = 'answer_id';
    } else if (itemType === 'review') {
      reportURL += `/reviews/${id}/report`;
      param = 'review_id';
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
      .catch((err) => {
        console.log('error reporting answer', err);
      });
  };

  return (
    <button
      type="button"
      className={styles.report__button}
      onClick={() => { report(); setButtonText('Reported'); }}
      data-testid="reportButton"
    >
      {buttonText}
    </button>
  );
}

ReportButton.propTypes = {
  itemType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ReportButton;
