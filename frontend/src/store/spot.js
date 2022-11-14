import { csrfFetch } from './csrf';

const normalizeWithId = (arr) => {
    const dataObj = {};
    arr.forEach(obj => dataObj[obj.id] = obj)
    return dataObj
};

const LOAD_SPOTS = "spot/loadSpots"

const loadSpots = (payload) => {
    return {
        type: LOAD_SPOTS,
        payload
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
}

const initalState = {};

const spotReducer = (state = initalState, action) => {
    let newState;
    switch(action.type) {
        case LOAD_SPOTS: 
            const dataObj = normalizeWithId(action.payload)
            newState = { ...state }
            newState = dataObj;
            return newState;
        default:
            return state;
    }
};

export default spotReducer;
