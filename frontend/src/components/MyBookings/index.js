import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { getUserBookings } from "../../store/booking";
function MyBookings() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    const bookings = useSelector(state => state.bookings.userBookings);
    const bookingsArr = Object.values(bookings)

    useEffect(() => {
        dispatch(getUserBookings()).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch])

    if (!isLoaded) {
        return (
            <div className="loader"></div>
        )
    }

    return (
        <>
        <div>
            <h3>My Bookings</h3>
        </div>
        {bookingsArr.length > 0 ? (
            <div>
                // map out each booking with MyBookingCard component
            </div>
        ) : 
            <div>
                <span>Oops... You Have No Bookings Yet!</span>
            </div>
        }
        </>
    )
};

export default MyBookings;
