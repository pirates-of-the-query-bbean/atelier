import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../sharedComponents/customButton/CustomButton';
import Modal from './Modal.jsx';
import styles from './AddQuestion.module.scss';

function AddAnswerModal({
  currentProduct, setCurrentProduct, question, isAddAnswerModalOpen, onSubmit
}) {
  const initialModalData = {
    answerBody: '',
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
    <div data-testid="addAnswerModal">
      <Modal isOpen={isAddAnswerModalOpen}>
        <form onSubmit={handleSubmit}>
          <h4>{currentProduct.name}</h4>
          <h5>{question.question_body}</h5>
          <div className={styles.modal__formRow}>
            <label htmlFor="answerBody">
              Your Answer*
              <textarea
                type="text"
                id="answerBody"
                name="answerBody"
                value={formState.answerBody}
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
                placeholder="Example: jack543!"
                onChange={handleInputChange}
                required
              />
            </label>
            <p>For privacy reasons, do not use your full name or email address.</p>
          </div>
          <div className={styles.modal__formRow}>
            <label htmlFor="email">
              Your email*
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                placeholder="Example: jack@email.com"
                onChange={handleInputChange}
                required
              />
            </label>
            <p>For authentication reasons, you will not be emailed.</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
          />
          <CustomButton
            style={styles.questions__customButton}
            text="Submit Answer"
            buttonWidth={225}
            onClickFunction={handleSubmit}
          />
        </form>
      </Modal>
    </div>
  );
}

// AddAnswerModal.propTypes = {
//   product: PropTypes.shape({

//   }).isRequired,
//   question: PropTypes.shape({

//   }).isRequired,
//   isOpen: PropTypes.function.isRequired,
//   onSubmit: PropTypes.function.isRequired,
// };

export default AddAnswerModal;
