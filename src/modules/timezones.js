import apiClient from 'api-client';
import {LOGOUT} from 'modules/auth';

const TIMEZONE_LOADING = 'TIMEZONE_LOADING';
const TIMEZONE_ADD = 'TIMEZONE_ADD';
const TIMEZONE_SAVE = 'TIMEZONE_SAVE';
const TIMEZONE_DELETE = 'TIMEZONE_DELETE';
const TIMEZONE_RESET = 'TIMEZONE_RESET';
const TIMEZONE_ERROR = 'TIMEZONE_ERROR';

const initialState = {
  loading: false,
  loaded: false,
  timezones: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TIMEZONE_LOADING:
      return {
        timezones: state.timezones,
        loading: true,
        loaded: state.loaded,
      };
    case TIMEZONE_RESET:
      return {
        timezones: action.result,
        loading: false,
        loaded: true,
      };
    case TIMEZONE_ADD:
      return {
        loading: false,
        timezones: state.timezones.concat(action.result),
        loaded: state.loaded,
      };
    case TIMEZONE_SAVE:
      return {
        loading: false,
        timezones: state.timezones.map((timezone) => {
          if (timezone.id === action.result.id) {
            return action.result;
          } else {
            return timezone;
          }
        }),
        loaded: state.loaded,
      };
    case TIMEZONE_DELETE:
      return {
        loading: false,
        timezones: state.timezones.filter(timezone => timezone.id !== action.result.id),
        loaded: state.loaded,
      };
    case TIMEZONE_ERROR:
      return {
        loading: false,
        error: action.error,
        timezones: state.timezones,
        loaded: state.loaded,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export function resetTimezones(token) {
  return {
    types: [TIMEZONE_LOADING, TIMEZONE_RESET, TIMEZONE_ERROR],
    promise: apiClient.resetTimezones(token),
  };
}

export function addTimezone(token, timezone) {
  return {
    types: [TIMEZONE_LOADING, TIMEZONE_ADD, TIMEZONE_ERROR],
    promise: apiClient.addTimezone(token, timezone),
  };
}

export function saveTimezone(token, timezone) {
  return {
    types: [TIMEZONE_LOADING, TIMEZONE_SAVE, TIMEZONE_ERROR],
    promise: apiClient.editTimezone(token, timezone),
  };
}

export function deleteTimezone(token, timezone) {
  return {
    types: [TIMEZONE_LOADING, TIMEZONE_DELETE, TIMEZONE_ERROR],
    promise: apiClient.deleteTimezone(token, timezone),
  };
}
