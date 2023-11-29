import React, { useRef, useState, useEffect } from 'react';
import CustomButton from '../../../sharedComponents/customButton/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from './Modal.module.scss';

function Modal({ isOpen, onClose, hasCloseBtn = true, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);

  function handleCloseModal() {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  }

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
        modalElement.show();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog ref={modalRef} onKeyDown={handleKeyDown} className={styles.modal}>
      {hasCloseBtn && (
      <button
        type="button"
        className={styles.modal__closeButton}
        onClick={handleCloseModal}
      >
        <CloseIcon />
      </button>
      )}
      {children}
    </dialog>
  );
}

export default Modal;
