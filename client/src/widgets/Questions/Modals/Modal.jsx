import React, { useRef, useState, useEffect } from 'react';
import styles from './Modal.module.scss';

function Modal({ isOpen, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setModalOpen(false);
    }
  }

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
      {children}
    </dialog>
  );
}

export default Modal;
