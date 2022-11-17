import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddSpotForm from '../AddSpotForm.js';

function HostSpotModal() {
    const [showSpotModal, setShowSpotModal] = useState(false);

    return (
        <>
            <p onClick={() => setShowSpotModal(true)} className='drop-content clickable'>Become a Host</p>
            {showSpotModal && (
                <Modal onClose={() => setShowSpotModal(false)}>
                    <AddSpotForm setShowSpotModal={setShowSpotModal} />
                </Modal>
            )}
        </>
    )
}

export default HostSpotModal;
