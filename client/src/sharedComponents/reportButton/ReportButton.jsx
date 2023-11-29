import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function ReportButton({
  itemType, id,
}) {
  const report = () => {
    console.log('clicked');

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
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log('error reporting answer', err);
      });
  };

  return (
    <button
      type="button"
      onClick={report}
    >
      Report
    </button>
  );
}

ReportButton.propTypes = {
  itemType: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ReportButton;
