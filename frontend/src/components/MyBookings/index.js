import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getUserBookings } from "../../store/booking";
import styles from './MyBookings.module.css';
import MyBookingCard from "../MyBookingCard";

function MyBookings() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasClicked, setHasClicked] = useState(false)
    const history = useHistory()

    const user = useSelector(state => state.session.user)
    const bookings = useSelector(state => state.bookings.userBookings);
    const bookingsArr = Object.values(bookings)

    useEffect(() => {
        dispatch(getUserBookings()).then(() => {
            setIsLoaded(true)
        })
    }, [dispatch, user])

    if (!isLoaded) {
        return (
            <div className="loader"></div>
        )
    }

    if (!user) {
        history.push('/')
    }

    return (
        <>
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <h3 className={styles.title}>My Bookings</h3>
            </div>
            {bookings && bookingsArr.length > 0 && user ? (
                <div className={styles.bookingContainer}>
                    {bookingsArr.map(booking => (
                        <MyBookingCard hasClicked={hasClicked} setHasClicked={setHasClicked} key={booking.id} booking={booking} />
                    ))}
                </div>
            ) : 
                <div>
                    <span>Oops... You Have No Bookings Yet!</span>
                </div>
            }
        </div>
        </>
    )
};

export default MyBookings;
