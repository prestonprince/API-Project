import { useDispatch } from 'react-redux';

import { deleteBooking } from '../../store/booking';
import styles from './MyBookingCard.module.css'

function MyBookingCard({ hasClicked, setHasClicked, booking }) {
    const dispatch = useDispatch();

    function handleCancel() {
        dispatch(deleteBooking(booking.id)).then(() => {
            setHasClicked(!hasClicked)
        })
        // dispatch(deleteBooking(booking.id))
    }


    return (
        <>
        <div className={styles.container}>
            <div className={styles.picContainer}>
                <img
                src={booking.Spot.previewImage}
                alt='spotPic'
                className={styles.pic}
                ></img>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.locationContainer}>
                    <span>{booking.Spot.address}</span>
                    <span>{booking.Spot.city}, {booking.Spot.state}</span>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.datesContainer}>
                    <div className={styles.date}>
                        <span>Check In</span>
                        <span>{booking.startDate}</span>
                    </div>
                    <div className={styles.date}>
                        <span>Check Out</span>
                        <span>{booking.endDate}</span>
                    </div>
                </div>
                <hr className={styles.line}></hr>
                <div className={styles.btnContainer}>
                    <button onClick={handleCancel} className={styles.btn}>Cancel</button>
                </div>
            </div>
        </div>
        </>
    )
};

export default MyBookingCard;
