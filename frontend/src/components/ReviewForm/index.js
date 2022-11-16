import { useState } from "react";
import { useParams, Redirect, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { csrfFetch } from "../../store/csrf";
import { postReview } from "../../store/spot";

const ReviewForm = () => {
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()

    const { spotId } = useParams();
    const user = useSelector(state => state.session.user);
    const history = useHistory();

    //TODO: make thunk to post reviews by spotId

    const onSubmit = async (e) => {
        e.preventDefault();

        const reviewInfo = {
            spotId,
            review,
            stars
        };

        return dispatch(postReview(reviewInfo)).then((data) => {
            setReview('');
            setStars('');
            setErrors({});
            history.push(`/spots/${spotId}`)
        })
        .catch( async(res) => {
            const data = await res.json();
            if (data && data.message) setErrors(data.message) 
        })

        // const myFetch = async(info) => {
        //     const { spotId, ...rest } = info
        //     const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        //         method: "POST",
        //         body: JSON.stringify(rest)
        //     });

        //     if (res.ok) {
        //         const data = await res.json();
        //         console.log(data);
        //         return data
        //     } else {
        //         throw res
        //     }
        // };

        // return myFetch(reviewInfo).then(() => {
        //     setReview('');
        //     setStars('');
        //     setErrors({});
        //     history.push(`/spots/${spotId}`)
        // })
        // .catch(async(response) => {
        //     console.log(response)
        //     const data = await response.json();

        //     // if (data && data.message) setErrors(data.message)
        // })
        // const reviewResponse = myFetch(reviewInfo);
        // console.log(reviewResponse)

        // if (reviewResponse.ok) {
        //     setReview('');
        //     setStars('');
        //     setErrors({});
        //     history.push(`/spots/${spotId}`)
        // } else {
        //     const err = await reviewResponse.json();
        //     console.log(err.message)
        //     if (err && err.message) setErrors(err.message)
        // }
    };

    return (
        <div>
            {!user && <Redirect to='/'></Redirect>}
            {errors.length > 0 && (<p>{errors}</p>)}
            <form onSubmit={onSubmit}>
                <label htmlFor="review">
                    <textarea
                     onChange={(e) => setReview(e.target.value)}
                     value={review}
                     placeholder=' Write your review here'
                    >
                    </textarea>
                </label>
                <label htmlFor="stars">
                    <input 
                        type='number'
                        onChange={(e) => setStars(e.target.value)}
                        value={stars}
                        required
                    />
                </label>
                <button>Continue</button>
            </form>
        </div>
    )
};

export default ReviewForm;
