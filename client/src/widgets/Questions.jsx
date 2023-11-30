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
  const [isAddQuestionModalOpen, setAddQuestionModalOpen] = useState(false);
  const [questionsQuery, setQuestionsQuery] = useState('');
  const [initialQuestionArr, setInitialQuestionArr] = useState([]);

  function showTwoMoreItems(indexToAdjust, stateToAdjust) {
    indexToAdjust(stateToAdjust + 2);
  }

  function searchQuestions(query) {
    console.log(query);
    const searchArr = [...questionArr];
    const filteredQuestions = searchArr.filter((question) => {
      const regex = new RegExp(query, 'i');
      return regex.test(question.question_body);
    });
    setQuestionArr(filteredQuestions);
  }

  function handleSearch(e) {
    e.preventDefault();
    searchQuestions(questionsQuery);
  }

  function resetSearch() {
    setQuestionsQuery('');
    setQuestionArr(initialQuestionArr);
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
        setInitialQuestionArr(response.data.results);
      })
      .catch((err) => {
        console.log('error fetching questions', err);
      });
  }

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
      .then(() => {
        getQuestions(currentProduct.id);
      })
      .catch((err) => {
        console.log('Error posting question', err);
      });
    closeAddQuestionsModal();
  }

  useEffect(() => {
    getQuestions(currentProduct.id);
  }, []);

  return (
    <section className={styles.questions__container}>
      <h5>Questions & Answers</h5>
      <Search
        handleSearch={() => handleSearch}
        setQuestionsQuery={setQuestionsQuery}
        questionsQuery={questionsQuery}
        searchQuestions={() => searchQuestions}
        resetSearch={() => resetSearch}
      />
      <QuestionList
        currentProduct={currentProduct}
        questionArr={questionArr}
        questionsStartIndex={questionsStartIndex}
        showTwoMoreItems={() => showTwoMoreItems}
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
          onClickFunction={() => openAddQuestionsModal}
        />
      </div>
      <AddQuestionModal
        currentProduct={currentProduct}
        isAddQuestionModalOpen={isAddQuestionModalOpen}
        onClose={() => closeAddQuestionsModal}
        onSubmit={() => addQuestion}
      />
    </section>
  );
}

Questions.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    campus: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Questions;
