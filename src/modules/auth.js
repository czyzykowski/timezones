import apiClient from 'api-client';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

const initialState = {
  loggingIn: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loginError: null,
        token: action.result
      };
    case LOGIN_FAIL:
      return {
        loggingIn: false,
        token: null,
        loginError: action.error
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function login(username, password) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: apiClient.login(username, password)
  };
}

export function logout() {
  localStorage.removeItem('token');
  console.log('logout');
  return {
    type: LOGOUT
  };
}
