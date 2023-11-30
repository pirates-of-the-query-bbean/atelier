import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CustomButton from '../sharedComponents/customButton/CustomButton';
import Search from './Questions/Search.jsx';
import QuestionList from './Questions/QuestionList.jsx';
import styles from './Questions.module.scss';
import Modal from './Questions/Modals/Modal.jsx';

function Questions({ currentProduct }) {
  const [questionArr, setQuestionArr] = useState([]);
  const [questionsStartIndex, setQuestionStartIndex] = useState(0);
  const [answersStartIndex, setAnswersStartIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

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

  return (
    <section className={styles.questions__container}>
      <h5>Questions & Answers</h5>
      <Search
        handleSubmit={handleSubmit}
        questionAr={questionArr}
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
        <CustomButton
          style={styles.questions__customButton}
          text="More Answered Questions"
          buttonWidth={255}
          onClickFunction={() => {
            showTwoMoreItems(setQuestionStartIndex, questionsStartIndex);
          }}
        />
        <CustomButton
          style={styles.questions__customButton}
          text="Add A Question"
          Icon={AddIcon}
          buttonWidth={200}
          onClickFunction={() => { setModalOpen(true); }}
        />
      </div>
      <Modal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onSubmit={() => handleSubmit()}
      />
    </section>
  );
}

export default Questions;
