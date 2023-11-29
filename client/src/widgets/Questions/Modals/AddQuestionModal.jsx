import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../sharedComponents/customButton/CustomButton';
import Modal from './Modal';
import styles from './AddQuestion.module.scss';

function AddQuestionModal({
  currentProduct, isAddQuestionModalOpen, onSubmit, onClose
}) {
  const initialModalData = {
    questionBody: '',
    nickname: '',
    email: '',
  };

  const [formState, setFormState] = useState(initialModalData);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormState((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  }

  function handleSubmit() {
    onSubmit(formState);
    setFormState(initialModalData);
  }

  return (
    <Modal
    isOpen={isAddQuestionModalOpen}
    hasCloseBtn={true}
    onClose={onClose}
    className={styles.addQuestion__modal}>
      <form onSubmit={handleSubmit}>
        <h4>Ask Your Question</h4>
        <h5>About the {currentProduct.name}</h5>
        <div className={styles.modal__formRow}>
          <label htmlFor="questionBody">
            Your Question*
            <textarea
              id="questionBody"
              name="questionBody"
              value={formState.questionBody}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>
        <div className={styles.modal__formRow}>
          <label htmlFor="nickname">
            What is your nickname?*
            <input
              type="text"
              id="nickname"
              name="nickname"
              value={formState.nickname}
              onChange={handleInputChange}
              placeholder="Example: jackson11!"
              required
            />
          </label>
          <p>For privacy reasons, do not use your full name or email address.</p>
        </div>
        <div className={styles.modal__formRow}>
          <label htmlFor="email">
            Your Email*
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <p>For authentication reasons, you will not be emailed.</p>
        </div>
        <CustomButton
          style={styles.questions__customButton}
          text="Submit Question"
          buttonWidth={225}
          onClickFunction={handleSubmit}
        />
      </form>
    </Modal>
  );
}

// AddQuestionModal.propTypes = {
//   product: PropTypes.shape({

//   }).isRequired,
//   question: PropTypes.shape({

//   }).isRequired,
//   isOpen: PropTypes.function.isRequired,
//   onSubmit: PropTypes.function.isRequired,
// };

export default AddQuestionModal;
