import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ReviewForm from '../ReviewForm';

function ReviewFormModal({setReviewDelete}) {
    const [showReviewModal, setShowReviewModal] = useState(false);

    return (
        <>
        <button onClick={() => setShowReviewModal(true)} className="rev-button">Leave a review</button>
        {showReviewModal && (
            <Modal onClose={() => setShowReviewModal(false)}>
                <ReviewForm setReviewDelete={setReviewDelete} setShowReviewModal={setShowReviewModal}/>
            </Modal>
        )}
        </>
    )
};

export default ReviewFormModal;
