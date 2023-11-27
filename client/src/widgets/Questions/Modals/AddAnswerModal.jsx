import React, { useState } from 'react';
import Modal from './Modal.jsx';

function AddAnswerModal({
  product, question, isOpen, onSubmit
}) {
  const initialModalData = {
    title: `${product.name}: ${question.body}`,
    answer: '',
    nickname: '',
    email: '',
  };
  const [formState, setFormState] = useState(initialModalData);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formState);
    setFormState(initialModalData);
  }
}

export default AddAnswerModal;
