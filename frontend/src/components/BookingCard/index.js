import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postBooking } from '../../store/booking';
import styles from './BookingCard.module.css'
import "../SpotDetails/SpotDetails.css"

function BookingCard({ rating, spot }) {
    const user = useSelector(state => state.session.user)
    // function to format date to yyyy-mm-dd
    function formatDate(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    };

    const newDate = formatDate(new Date());
    const history = useHistory()

    const [startDate, setStartDate] = useState(newDate);
    const [endDate, setEndDate] = useState(newDate);
    const [guests, setGuests] = useState('')
    const [errors, setErrors] = useState('')
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        setErrors('')

        if (!user) {
            setErrors('Please log in or sign up before booking a spot');
            return;
        }

        if (user.id === spot.ownerId) {
            setErrors('You cannot book your own spot');
            return;
        }

        const startNum = startDate.split('-').join('')
        const endNum = endDate.split('-').join('')

        if (endNum < startNum) {
            setErrors('Check In date must be before Check Out date')
            return
        }

        const booking = {
            spotId: spot.id,
            startDate,
            endDate
        };

        dispatch(postBooking(booking)).then(() => {
            setErrors('');
            setStartDate(newDate);
            setEndDate(newDate);
            setGuests('');
            history.push('/bookings')
        }).catch(async(data) => {
            const err = await data.json();
            setErrors(err.message)
        })
        
    };

    return (
        <>
        <div className='booking-card'>
            <div className={styles.container}>
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <span className={styles.headerDet}>
                            <span id={styles.spotPrice}>${spot.price}</span>
                            <span id={styles.night}>night</span>
                        </span>
                        {rating ? (
                            <span id={styles.reviews} className={styles.headerDet}><i className="fa-solid fa-star"></i>{rating} · {spot.numReviews} reviews</span>
                        ):
                            <span id={styles.reviews} className={styles.headerDet}>No reviews</span>
                        }
                    </div>
                </div>
                <div>
                    <form className={styles.form} onSubmit={onSubmit}>
                        <div className={styles.inputs}>
                            <div className={styles.dateInputs}>
                                <label className={styles.dateContainer} htmlFor='startDate'>
                                    <input
                                    id={styles.startDate}
                                    className={styles.dates}
                                    type='date'
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                    />
                                </label>
                                <label className={styles.dateContainer} htmlFor='endDate'>
                                    <input
                                    id={styles.endDate}
                                    type='date'
                                    className={styles.dates}
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                    />
                                </label>
                            </div>
                            <label className={styles.guestContainer} htmlFor='guests'>
                                <input 
                                id={styles.guestInput}
                                type='number'
                                placeholder='Guests'
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                />
                            </label>
                        </div>
                        <button className={styles.btn}>Reserve</button>
                    </form>
                </div>
                <div className={styles.errors}>
                    {errors && (
                        <span>{errors}</span>
                    )}
                </div>
                <div className={styles.noCharge}>

                </div>
                <div className={styles.fees}>

                </div>
                <div className={styles.total}>

                </div>
            </div>
        </div>
        </>
    )
};

export default BookingCard;
