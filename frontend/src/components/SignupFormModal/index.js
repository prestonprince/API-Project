import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignUpForm';

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className='signup-btn' onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage props={{showModal, setShowModal}}/>
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
