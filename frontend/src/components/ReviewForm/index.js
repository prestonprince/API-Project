import { useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { postReview } from "../../store/spot";
import './ReviewForm.css'

const ReviewForm = ({ setShowReviewModal, setReviewDelete }) => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()

    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault();

        console.log(stars)

        if (+stars < 0 || +stars > 5) {
            setErrors('Please enter a star number between 1 and 5')
            return;
        };

        const regEx = /[A-Za-z]/

        if (!regEx.test(review)) {
            setErrors('Please enter a valid review');
            return
        }

        const reviewInfo = {
            spotId,
            review,
            stars
        };

        return dispatch(postReview(reviewInfo)).then((data) => {
            setReview('');
            setStars('');
            setErrors({});
            setShowReviewModal(false);
            setReviewDelete(prevState => !prevState)
            history.push(`/spots/${spotId}`)
        })
        .catch( async(res) => {
            const data = await res.json();
            if (data && data.message) setErrors(data.message) 
        })
    };

    return (
        <div>
            {!user && <Redirect to='/'></Redirect>}
            <h3>Leave a review</h3>
            {errors.length > 0 && (<p className="errors">{errors}</p>)}
            <form onSubmit={onSubmit}>
                <label htmlFor="review">
                    <textarea
                     className="input review-area"
                     onChange={(e) => setReview(e.target.value)}
                     value={review}
                     placeholder=' Write your review here'
                    >
                    </textarea>
                </label>
                <label htmlFor="stars">
                    <input 
                        className="input"
                        type='number'
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                        placeholder=" Stars"
                        required
                    />
                </label>
                <br></br>
                <br></br>
                <button id="submit-review" className="button submit-rev">Continue</button>
            </form>
        </div>
    )
};

export default ReviewForm;
