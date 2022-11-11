import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

// regular action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// THUNK action creators
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });

  if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
      return data;
  } else {
    throw response
  };

};

export const restoreUser = () => async(dispatch) => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data));
  return response;
};

export const signupUser = ({firstname, lastname, username, email, password}) => async dispatch =>  {
  const response = await csrfFetch('/api/users', {
    method: "POST",
    body: JSON.stringify({
      firstname,
      lastname,
      username,
      email,
      password
    })
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(login({credential: email, password}))
    return data;
  } else {
    throw response;
  }
};

 export const logout = () => async dispatch => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(removeUser());
  const data = await response.json();
  return data;
 };

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
