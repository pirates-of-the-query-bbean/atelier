import React, {useState, useEffect} from 'react';
import CustomButton from './sharedComponents/customButton/CustomButton.jsx';
import Search from './questions/Search.jsx';
import QuestionList from './questions/QuestionList.jsx';


const Questions = ({ props }) => {

  //helper funx'ns
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit invoked');
  }

  const showMoreQuestions = () => {
    console.log('button clicked');
  }

  // Button objects
  const moreQuestionsBtn = {
    text: 'More Answered Questions',
    buttonWidth: 200,
    onClickFunction: (() => { showMoreQuestions() }),
  }

  // Add A Question btn
  const addQuestionBtn = {
    text: 'Add A Question',
    icon: 'AddIcon',
    buttonWidth: 200,
    onClickFunction: (() => { handleSubmit() })
  }


  return (
    <div>
      <h2>Questions & Answers</h2>
      <>
        <Search />
        <QuestionList />
      </>

      <div className='questions__interactive--buttons'>
        {/* <CustomButton moreQuestionsBtn />
        <CustomButton addQuestionBtn /> */}
      </div>
    </div>
  )
}

export default Questions;
