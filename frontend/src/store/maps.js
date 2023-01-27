import { csrfFetch } from "./csrf";

const LOAD_API_KEY = 'maps/LOAD_API_KEY';

const loadApiKey = function(key) {
    return {
        type: LOAD_API_KEY,
        payload: key
    }
};

export const getKey = () => async(dispatch) => {
    const res = await csrfFetch('/api/maps/key', {
        method: 'POST'
    });
    
    const data = await res.json();
    dispatch(loadApiKey(data.googleMapsAPIKey));
};

const initalState = { key: null };

const mapsReducer = (state = initalState, action) => {
    switch(action.type) {
        case LOAD_API_KEY:
            return { key: action.payload };
        default:
            return state;
    }
};

export default mapsReducer;
