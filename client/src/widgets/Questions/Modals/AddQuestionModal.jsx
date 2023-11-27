import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal.jsx';

function AddQuestionModal({
  product, question, isOpen, onSubmit
}) {
  const initialModalData = {
    title: `${product.name}: ${question.body}`,
    questionBody: '',
    nickname: '',
    email: '',
  };

  const [formState, setFormState] = useState(initialModalData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((previousFormData) => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    setFormState(initialModalData);
  };

  return (
    <div>
      <Modal isOpen={isOpen} />
      <form onSubmit={handleSubmit}>
        <h4>Ask Your Question</h4>
        <h5>About the {product.name}</h5>
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
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
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
