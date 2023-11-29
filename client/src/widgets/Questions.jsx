import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import CustomButton from '../sharedComponents/customButton/CustomButton';
import Search from './questions/Search';
import QuestionList from './questions/QuestionList';
import styles from './Questions.module.scss';
import AddQuestionModal from './questions/Modals/AddQuestionModal';

function Questions({ currentProduct }) {
  const [questionArr, setQuestionArr] = useState([]);
  const [questionsStartIndex, setQuestionStartIndex] = useState(3);
  const [answersStartIndex, setAnswersStartIndex] = useState(0);
  const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);

  function sort(arr, setState, property) {
    const sortedArr = [...arr].sort((a, b) => b[property] - a[property]);
    setState(sortedArr);
  }

  function showTwoMoreItems(indexToAdjust, stateToAdjust) {
    indexToAdjust(stateToAdjust + 2);
  }

  function handleSearch() {
    console.log('handle submit invoked');
  }

  function openAddQuestionsModal() {
    setAddQuestionModalOpen(true);
  }

  function closeAddQuestionsModal() {
    setAddQuestionModalOpen(false);
  }

  function getQuestions(id) {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/?product_id=${id}&count=100`, {
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
    })
      .then((response) => {
        setQuestionArr(response.data.results);
        sort(response.data.results, setQuestionArr, 'question_helpfulness');
        console.log('RESPONSE IS', response.data.results);
      })
      .then(() => {

      })
      .catch((err) => {
        console.log('error fetching questions', err);
      })
      .finally(() => console.log('FINALLY',questionArr));
  }

  console.log('state is: ', questionArr);

  function addQuestion(data) {
    axios({
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/',
      headers: {
        Authorization: process.env.REACT_APP_API_KEY,
      },
      data: {
        body: data.questionBody,
        name: data.nickname,
        email: data.email,
        product_id: currentProduct.id
      },
    })
      .then((response) => {
        console.log(response);
        getQuestions(currentProduct.id);
      })
      .catch((err) => {
        console.log('Error posting question', err);
      });
    console.log(data);
    closeAddQuestionsModal();
  }

  useEffect(() => {
    getQuestions(currentProduct.id);
  }, []);

  return (
    <section className={styles.questions__container}>
      <h5>Questions & Answers</h5>
      <Search
        handleSearch={handleSearch}
        questionArr={questionArr}
      />
      <QuestionList
        currentProduct={currentProduct}
        questionArr={questionArr}
        questionsStartIndex={questionsStartIndex}
        answersStartIndex={answersStartIndex}
        setAnswersStartIndex={setAnswersStartIndex}
        showTwoMoreItems={showTwoMoreItems}
        sort={sort}
      />

      <div className={styles.questions__buttons}>
        {questionArr.length > questionsStartIndex && (
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
          onClickFunction={openAddQuestionsModal}
        />
      </div>
      <AddQuestionModal
        currentProduct={currentProduct}
        isAddQuestionModalOpen={isAddQuestionModalOpen}
        onSubmit={addQuestion}
      />
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
