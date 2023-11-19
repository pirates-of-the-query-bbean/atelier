import React, {useState} from 'react';

function Answer({ answer, upvote, report }) {
  const {body, date, answerer_name, helpfulness, photos} = answer;

  function formattedDate(date) {
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
              upvote(e);
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