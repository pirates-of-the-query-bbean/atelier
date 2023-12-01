import React from 'react';
import PropTypes from 'prop-types';

function ParsedDate({ date }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div>
      {formatDate(date)}
    </div>
  );
}

ParsedDate.propTypes = {
  date: PropTypes.string.isRequired,
};

export default ParsedDate;
