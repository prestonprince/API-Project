import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ModalTwo } from '../../context/Modal';

function DropdownModal({ props: {handleClick, user} }) {
  const history = useHistory();
  const [showModal, setShowModal] = useState(true);

  const mySpotsClick = (e) => {
    e.preventDefault();
    history.push(`/users/${user.id}`)
  };

  const hostSpot = (e) => {
    e.preventDefault();
    history.push('/spots/new')
  };

  return (
    <>
      {showModal && (
        <ModalTwo onClose={() => setShowModal(false)}>
            <div className='dropdown'>
                <p className='drop-content'>{user.username}</p>
                <p className='drop-content'>{user.email}</p>
                <p onClick={hostSpot} className='drop-content clickable'>Become a Host</p>
                <p onClick={mySpotsClick} className='drop-content clickable'>My Spots</p>
                <button className='btn' onClick={handleClick}><span className='lgText'>Log Out</span></button>  
            </div>
        </ModalTwo>
      )}
    </>
  );
}

export default DropdownModal;
