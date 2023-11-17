import React, {useState} from 'react';

const Answer = ({ answer, helfpul, report }) => {
  const {body, date, answerer_name, helpfulness, photos} = answer;

  return (
    <section>
      <h2>A:</h2>
        <p>{body}</p>
        <div className='answer__meta'>
          <p>
            by {answerer_name},
            {answerer_name === 'Seller' ? (
              <span><b>Seller,</b> {answer.date}</span>
            ) : (
              answer.date )}
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