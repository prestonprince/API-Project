import React, { useState } from 'react';
import { ModalTwo } from '../../context/Modal';

function DropdownModal({ props: {handleClick, user} }) {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      {showModal && (
        <ModalTwo onClose={() => setShowModal(false)}>
            <div className='dropdown'>
                <p className='drop-content'>{user.username}</p>
                <p className='drop-content'>{user.email}</p>
                <button className='btn' onClick={handleClick}><span className='lgText'>Log Out</span></button>  
            </div>
        </ModalTwo>
      )}
    </>
  );
}

export default DropdownModal;
