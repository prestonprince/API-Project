import { csrfFetch } from './csrf';

const normalizeWithId = (arr) => {
    const dataObj = {};
    arr.forEach(obj => dataObj[obj.id] = obj)
    return dataObj
};

const LOAD_SPOTS = "spot/loadSpots";

const loadSpots = (payload) => {
    return {
        type: LOAD_SPOTS,
        payload
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
        console.log(data)
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
        body: JSON.stringify(rest)
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

const initalState = {};

const spotReducer = (state = initalState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_SPOTS: 
            const dataObj = normalizeWithId(action.payload)
            newState = dataObj;
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
