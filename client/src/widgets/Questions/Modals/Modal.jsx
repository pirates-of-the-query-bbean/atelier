import React, { useState, useEffect } from 'react';

function Modal({ isOpen, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() =>{
    setModalOpen(isOpen)
  }, (isOpen));

  return (
    <dialog className='modal'>
      {children}
    </dialog>
  );
}

export default Modal;
