import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createHistory} from 'history';
import {Provider} from 'react-redux';

import promiseMiddleware from 'stores/promise-middleware';
import authReducer from 'modules/auth';
import timezonesReducer from 'modules/timezones';
import userReducer from 'modules/user';
import usersReducer from 'modules/users';
import {LOGIN_SUCCESS} from 'modules/auth';
import getRoutes from 'routes';


const reducer = combineReducers({
  auth: authReducer,
  timezones: timezonesReducer,
  user: userReducer,
  users: usersReducer,
});

const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);
const token = localStorage.getItem('token');
if (token) {
  store.dispatch({
    type: LOGIN_SUCCESS,
    result: token,
  });
}

// const history = createHistory({});

render((
  <Provider store={store}>
    <Router routes={getRoutes(store)} />
  </Provider>
), document.getElementById('main'));
