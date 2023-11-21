import React, { useState } from 'react';
import CustomButton from './sharedComponents/customButton/CustomButton';
import Search from './questions/Search';
import QuestionList from './questions/QuestionList';
import styles from './Questions.module.scss';
import Modal from './questions/Modal';

function Questions() {
  const questionsObj = [{
    question_id: 37,
    question_body: 'Why is this product cheaper here than other sites?',
    question_date: '2018-10-18T00:00:00.000Z',
    asker_name: 'williamsmith',
    question_helpfulness: 1,
    reported: false,
    answers: {
      68: {
        id: 68,
        body: 'We are selling it here without any markup from the middleman!',
        date: '2018-08-18T00:00:00.000Z',
        answerer_name: 'Seller',
        helpfulness: 4,
        photos: [],
      },
    },
  },
  {
    question_id: 38,
    question_body: 'How long does it last?',
    question_date: '2019-06-28T00:00:00.000Z',
    asker_name: 'funnygirl',
    question_helpfulness: 5,
    reported: false,
    answers: {
      70: {
        id: 70,
        body: 'Some of the seams started splitting the first time I wore it!',
        date: '2019-11-28T00:00:00.000Z',
        answerer_name: 'sillyguy',
        helpfulness: 6,
        photos: [],
      },
      78: {
        id: 78,
        body: '9 lives',
        date: '2019-11-12T00:00:00.000Z',
        answerer_name: 'iluvdogz',
        helpfulness: 31,
        photos: [],
      },
    },
  }];

  const [questionArr, setQuestionArr] = useState(questionsObj);
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
          style={styles.custom__button}
          text="More Answered Questions"
          buttonWidth={245}
          onClickFunction={() => {
            showTwoMoreItems(setQuestionStartIndex, questionsStartIndex);
          }}
        />
        <CustomButton
          style={styles.custom__button}
          text="Add A Question"
          Icon="AddIcon"
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
