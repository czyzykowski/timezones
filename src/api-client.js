import axios from 'axios';
import {prop, compose} from 'ramda';


function extractError(response) {
  throw response.data.non_field_errors.join('\n');
}

function extractToken(response) {
  return response.data.token;
}

function saveToken(token) {
  localStorage.setItem('token', token);
  return token;
}

function headers(token) {
  return {
    headers: {Authorization: `Token ${token}`}
  };
}

const getData = prop('data');

export default {
  resetTimezones(token) {
    return axios.get('/api/timezones', headers(token)).then(getData);
  },

  addTimezone(token, timezone) {
    return axios.post('/api/timezones', timezone, headers(token)).then(getData);
  },

  editTimezone(token, timezone) {
    return axios.put(`/api/timezones/${timezone.id}`, timezone, headers(token)).then(getData);
  },

  deleteTimezone(token, timezone) {
    return axios.delete(`/api/timezones/${timezone.id}`, headers(token)).then(() => timezone);
  },

  resetUsers(token) {
    return axios.get('/api/users', headers(token)).then(getData);
  },

  addUser(token, user) {
    return axios.post('/api/users', user, headers(token)).then(getData);
  },

  editUser(token, user) {
    return axios.put(`/api/users/${user.id}`, user, headers(token)).then(getData);
  },

  deleteUser(token, user) {
    return axios.delete(`/api/users/${user.id}`, headers(token)).then(() => user);
  },

  userRole(token) {
    return axios.get('/api/', headers(token)).then(compose(prop('role'), prop('data')));
  },

  login(username, password) {
    return axios.post('/api/api-token-auth/', {username, password})
      .then(extractToken)
      .then(saveToken)
      .catch(extractError);
  }
};
