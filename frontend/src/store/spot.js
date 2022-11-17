import { csrfFetch } from './csrf';

const normalizeWithId = (arr) => {
    const dataObj = {};
    arr.forEach(obj => dataObj[obj.id] = obj)
    return dataObj
};

const LOAD_SPOTS = "spot/loadSpots";
const LOAD_SINGLE = "spot/loadSingle"
const LOAD_REVIEWS = "spot/loadReviews"

const loadSpots = (payload) => {
    return {
        type: LOAD_SPOTS,
        payload
    }
};

const loadSingle = (payload) => {
    return {
        type: LOAD_SINGLE,
        payload
    }
};

const loadReviews = (payload) => {
    return {
        type: LOAD_REVIEWS,
        payload
    }
};

export const deleteReview = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchSingleSpot);
        dispatch(fetchSpotReviews)
        return data
    } else {
        throw response
    }
};

export const postReview = (payload) => async(dispatch) => {
    const { spotId, ...rest } = payload;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(rest)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchSpotReviews)
        return data
    } else {
        throw response
    }
};

export const fetchSpotReviews = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data))
        return data
    } else {
        throw response
    }
};

export const fetchSingleSpot = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSingle(data))
        return data
    } else {
        throw response
    }
};

export const editSpot = (spot) => async(dispatch) => {
    const {id, ...rest} = spot;
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: "PUT",
        body: JSON.stringify(rest)
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchAllSpots());
        return data
    } else {
        throw response
    }
};

export const removeSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(fetchAllSpots())
        return data
    } else {
        throw response
    }
};


export const fetchAllSpots = () => async(dispatch) => {
    const response = await csrfFetch('/api/spots');

    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots))
        return data
    } else {
        throw response;
    }
};

export const postSpot = (spot) => async(dispatch) => {
    const {previewImageUrl, ...rest} = spot;

    const response = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify({ ...rest, lat: 1.435, lng: 0.2342 })
    });

    if (response.ok) {
        const data = await response.json();
        const imageResponse = await csrfFetch(`/api/spots/${data.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImageUrl,
                preview: true
            })
        });

        if (imageResponse.ok) {
            dispatch(fetchAllSpots())
            return data;
        } else {
            throw response;
        };

    } else {
        throw response;
    }
};

const initalState = {allSpots: {}, singleSpot: {}, spotReviews: {}};

const spotReducer = (state = initalState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_SPOTS: 
            const dataObj = normalizeWithId(action.payload)
            newState = {...state, allSpots: dataObj};
            return newState;
        case LOAD_SINGLE: 
            newState = {...state, singleSpot: action.payload};
            return newState
        case LOAD_REVIEWS:
            newState = {...state, spotReviews: action.payload};
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
