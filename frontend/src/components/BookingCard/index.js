import { useState } from 'react'
import { useDispatch } from 'react-redux';

import { postBooking } from '../../store/booking';
import styles from './BookingCard.module.css'
import "../SpotDetails/SpotDetails.css"

function BookingCard({ rating, spot }) {
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
    }
    const newDate = formatDate(new Date());

    const [startDate, setStartDate] = useState(newDate);
    const [endDate, setEndDate] = useState(newDate);
    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault();

        const startNum = startDate.split('-').join('')
        const endNum = endDate.split('-').join('')

        if (endNum < startNum) {
            console.log('OOOOOPS');
            return
        }

        const booking = {
            spotId: spot.id,
            startDate,
            endDate
        };

        dispatch(postBooking(booking)).catch(async(data) => {
            const err = await data.json();
            console.log('ERRR', err)
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
                <div className={styles.form}>
                    <form onSubmit={onSubmit}>
                        <label htmlFor='startDate'>
                            <input
                            type='date'
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            />
                        </label>
                        <label htmlFor='endDate'>
                            <input
                            type='date'
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            />
                        </label>
                        <button>Reserve</button>
                    </form>
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
