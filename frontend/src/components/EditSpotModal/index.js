import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditSpotForm from '../EditSpotForm';

function EditSpotModal({ spot, setEditSubmit }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='clickable edit-btn' onClick={() => setShowModal(true)}><i className="fa-regular fa-pen-to-square"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditSpotForm setEditSubmit={setEditSubmit} setShowModal={setShowModal} spot={spot}/>
                </Modal>
            )}
        </>
    )
};

export default EditSpotModal;
