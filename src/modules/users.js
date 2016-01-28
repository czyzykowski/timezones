import {propEq, update, indexOf} from 'ramda';

import apiClient from 'api-client';
import LOGOUT from 'modules/auth';

const USERS_LOADING = 'USERS_LOADING';
const USERS_ADD = 'USERS_ADD';
const USERS_SAVE = 'USERS_SAVE';
const USERS_DELETE = 'USERS_DELETE';
const USERS_RESET = 'USERS_RESET';
const USERS_ERROR = 'USERS_ERROR';

const initialState = {
  loading: false,
  loaded: false,
  users: []
};

const userIndex = indexOf(propEq('id'));

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USERS_LOADING:
      return {
        users: state.users,
        loading: true,
        loaded: state.loaded
      };
    case USERS_RESET:
      return {
        users: action.result,
        loading: false,
        loaded: true
      };
    case USERS_ADD:
      return {
        loading: false,
        users: state.users.concat(action.result),
        loaded: state.loaded
      };
    case USERS_SAVE:
      return {
        loading: false,
        users: update(userIndex(action.result.id, state.users), action.result, state.users),
        loaded: state.loaded
      };
    case USERS_DELETE:
      return {
        loading: false,
        users: state.users.filter(user => user.id !== action.result.id),
        loaded: state.loaded
      };
    case USERS_ERROR:
      return {
        loading: false,
        error: action.error,
        users: state.users,
        loaded: state.loaded
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function resetUsers(token) {
  return {
    types: [USERS_LOADING, USERS_RESET, USERS_ERROR],
    promise: apiClient.resetUsers(token)
  };
}

export function addUser(token, user) {
  return {
    types: [USERS_LOADING, USERS_ADD, USERS_ERROR],
    promise: apiClient.addUser(token, user)
  };
}

export function saveUser(token, user) {
  return {
    types: [USERS_LOADING, USERS_SAVE, USERS_ERROR],
    promise: apiClient.editUser(token, user)
  };
}

export function deleteUser(token, user) {
  return {
    types: [USERS_LOADING, USERS_DELETE, USERS_ERROR],
    promise: apiClient.deleteUser(token, user)
  };
}
