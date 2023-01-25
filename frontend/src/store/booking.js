import { csrfFetch } from "./csrf";
import { normalizeWithId } from "./spot";

const LOAD_BOOKINGS = 'spot/loadBookings';
const ADD_BOOKING = 'spot/addBooking';
const REMOVE_BOOKING = 'spot/removeBooking';

const loadBookings = (payload) => {
    return {
        type: LOAD_BOOKINGS,
        payload
    }
};

const addBooking = (payload) => {
    return {
        type: ADD_BOOKING,
        payload
    }
};

const removeBooking = (payload) => {
    return {
        type: REMOVE_BOOKING,
        payload
    }
};

export const getUserBookings = () => async(dispatch) => {
    const response = await csrfFetch('/api/bookings/current');

    if (response.ok) {
        const data = await response.json();
        const normalizedData = normalizeWithId(data.Bookings);
        dispatch(loadBookings(normalizedData));
        return normalizedData;
    };
    const err = await response.json();
    throw err;
};

export const postBooking = ({ spotId, startDate, endDate }) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify({
            startDate,
            endDate
        })
    });

    if (response.ok) {
        const data = await response.json();
        const normalizedData = { ...data, id: data.id, spotId: +data.spotId };
        dispatch(addBooking(normalizedData));
        return normalizedData;
    };
    const err = await response.json();
    throw err;
};

export const deleteBooking = (bookingId) => async(dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(removeBooking(bookingId));
        return data
    };
    const err = await response.json();
    throw err;
}

const initialState = {userBookings: {}};

const bookingReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_BOOKINGS:
            const obj = action.payload
            newState = {...state, userBookings: obj};
            return newState;
        case ADD_BOOKING: 
            const newBooking = action.payload;
            const newBookingId = newBooking.id;
            newState = { ...state };
            newState.userBookings[newBookingId] = newBooking;
            return newState
        case REMOVE_BOOKING:
            const bookingId = action.payload;
            newState = {...state};
            delete newState.userBookings[bookingId];
        default:
            return state
    }
};

export default bookingReducer;
