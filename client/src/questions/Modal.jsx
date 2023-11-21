import React, { useState, useEffect } from 'react'

function Modal({isOpen, onClose, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  useEffect(() =>{
    setModalOpen(isOpen)
  }, (isOpen))

  
  return (
    <dialog className='modal'>
      {children}
    </dialog>
  )

}

export default Modal;