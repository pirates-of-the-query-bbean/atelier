import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../../../sharedComponents/customButton/CustomButton';
import Modal from './Modal';
import styles from './AddQuestion.module.scss';

function AddAnswerModal({
  currentProduct, question, isAddAnswerModalOpen, onSubmit,
}) {
  const initialModalData = {
    body: '',
    name: '',
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
    onSubmit(formState, question.question_id);
    setFormState(initialModalData);
  }

  return (
    <div data-testid="addAnswerModal">
      <Modal isOpen={isAddAnswerModalOpen}>
        <form onSubmit={handleSubmit}>
          <h4>{currentProduct.name}</h4>
          <h5>{question.question_body}</h5>
          <div className={styles.modal__formRow}>
            <label htmlFor="body">
              Your Answer*
              <textarea
                type="text"
                id="body"
                name="body"
                value={formState.body}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div className={styles.modal__formRow}>
            <label htmlFor="name">
              What is your nickname?*
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
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

AddAnswerModal.propTypes = {
  currentProduct: PropTypes.shape({

  }).isRequired,
  question: PropTypes.shape({

  }).isRequired,
  isAddAnswerModalOpen: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddAnswerModal;
