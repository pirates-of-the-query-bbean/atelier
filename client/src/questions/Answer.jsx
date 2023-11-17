import React, {useState} from 'react';

const Answer = ({ answer, helfpul, report }) => {
  const {body, date, answerer_name, helpfulness, photos} = answer;

  const formattedDate = (date) => {
    date = new Date(date);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <section>
      <h2>A:</h2>
        <p>{body}</p>
        <div className='answer__meta'>
          <p>
            by {answerer_name}
            {answerer_name === 'Seller' ? (
              <span> -<b>Seller,</b> {formattedDate(answer.date)}</span>
            ) : (<span>, {formattedDate(answer.date)}</span>)}
          </p>
          <p>
            <a href='#' onClick={(e)=> {
              e.preventDefault();
              upvote();
            }}>Helpful?</a>  ({helpfulness})
          </p>
          <p>
            <a href='#' onClick={(e)=> {
              e.preventDefault();
              report(movie);
            }}>Report</a>
          </p>
        </div>
    </section>
  )

}

export default Answer;