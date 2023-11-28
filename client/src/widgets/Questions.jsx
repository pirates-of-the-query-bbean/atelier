import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import CustomButton from '../sharedComponents/customButton/CustomButton';
import Search from './questions/Search';
import QuestionList from './questions/QuestionList';
import AddIcon from '@mui/icons-material/Add';
import styles from './Questions.module.scss';
import AddQuestionModal from './questions/Modals/AddQuestionModal';

function Questions({ currentProduct, questions }) {
  const questionsObj = [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
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
  },
  {
    "question_id": 39,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_helpfulness": 2,
    "reported": false,
    "answers": {
      99: {
        "id": 70,
        "body": "Some of the seams started splitting the first time I wore it!",
        "date": "2019-11-28T00:00:00.000Z",
        "answerer_name": "sillyguy",
        "helpfulness": 6,
        "photos": [],
      },
      100: {
        "id": 78,
        "body": "9 lives",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 31,
        "photos": [],
      }
    }
  }];

  const [questionArr, setQuestionArr] = useState(questionsObj);
  const [questionsStartIndex, setQuestionStartIndex] = useState(0);
  const [answersStartIndex, setAnswersStartIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  console.log(Array.isArray(questionsObj));

  function sort(arr, setState, property) {
    const sortedArr = [...arr].sort((a, b) => b[property] - a[property]);
    setState(sortedArr);
  }

  function showTwoMoreItems(indexToAdjust, stateToAdjust) {
    indexToAdjust(stateToAdjust + 2);
  }

  function handleSubmit() {
    console.log('handle submit invoked');
  }

  function getQuestions() {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${currentProduct.id}`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setQuestionArr(response.data);
      })
      .catch((err) => {
        console.log('error fetching questions', err);
      });
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <section className={styles.questions__container}>
      <h5>Questions & Answers</h5>
      <Search
        handleSubmit={handleSubmit}
        questionArr={questionArr}
      />
      <QuestionList
        questionArr={questionArr}
        setQuestionArr={setQuestionArr}
        questionsStartIndex={questionsStartIndex}
        answersStartIndex={answersStartIndex}
        setAnswersStartIndex={setAnswersStartIndex}
        showTwoMoreItems={showTwoMoreItems}
        sort={sort}
      />

      <div className={styles.questions__buttons}>
        {questionArr.length > 0 && (
          <CustomButton
            style={styles.questions__customButton}
            text="More Answered Questions"
            buttonWidth={255}
            onClickFunction={() => {
              showTwoMoreItems(setQuestionStartIndex, questionsStartIndex);
            }}
          />
        )}

        <CustomButton
          style={styles.questions__customButton}
          text="Add A Question"
          Icon={AddIcon}
          buttonWidth={200}
          onClickFunction={() => { setModalOpen(true); }}
        />
      </div>
      {/* <AddQuestionModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onSubmit={() => handleSubmit()}
      /> */}
    </section>
  );
}

// Questions.propTypes = {
//   currentProduct: PropTypes.shape({

//   }).isRequired,
//   questions: PropTypes.arrayOf({
//     question_id: PropTypes.number,
//     question_body: PropTypes.string,
//     question_helpfulness: PropTypes.number,
//     reported: PropTypes.boolean,
//     answers: PropTypes.shape({
//       id: PropTypes.number,
//     }),
//   }).isRequired,
// };

export default Questions;
