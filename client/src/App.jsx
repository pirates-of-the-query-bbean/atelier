import React from 'react';
import styles from './App.module.scss';
import FiveStars from './sharedComponents/FiveStars.jsx';
import UpvoteLink from './sharedComponents/upvoteLink/UpvoteLink.jsx';

function App() {

  const testQuestion =  {
    "question_id": 38,
    "question_body": "How long does it last?",
    "question_date": "2019-06-28T00:00:00.000Z",
    "asker_name": "funnygirl",
    "question_helpfulness": 2,
    "reported": false,
    "answers": {
      70: {
        "id": 70,
        "body": "Some of the seams started splitting the first time I wore it!",
        "date": "2019-11-28T00:00:00.000Z",
        "answerer_name": "sillyguy",
        "helpfulness": 6,
        "photos": [],
      },
      78: {
        "id": 78,
        "body": "9 lives",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 31,
        "photos": [],
      }
    }
  }

  const questionKey = 'question_helpfulness';

  return (
    <div>
      <h1 data-testid="app-hw" className={styles.ugly}>Pirates of the query-bbean</h1>
      <UpvoteLink item={testQuestion} property={questionKey}/>

    </div>
  );
}

export default App;
