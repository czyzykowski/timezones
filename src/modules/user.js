import apiClient from 'api-client';
import {LOGOUT} from 'modules/auth';

const USER_LOADING = 'USER_LOADING';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        loaded: false,
        loading: true
      };
    case USER_SUCCESS:
      return {
        loaded: true,
        loading: false,
        role: action.result
      };
    case USER_ERROR:
      return {
        loaded: false,
        loading: false,
        error: action.error
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function loadUser(token) {
  return {
    types: [USER_LOADING, USER_SUCCESS, USER_ERROR],
    promise: apiClient.userRole(token)
  };
}
