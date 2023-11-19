import React from 'react';

const ParsedDate = ({date}) => {

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

return (
  <div>
    {formatDate(date)}
  </div>
)

}

export default ParsedDate;