import React, {Component} from 'react';
import {Route} from 'react-router';

import Application from 'components/application';
import Loading from 'components/loading';
import Login from 'components/login';
import Logout from 'components/logout';
import NotFound from 'components/not-found';
import TimezoneContainer from 'components/timezone-container';
import TimezoneDetail from 'components/timezone-detail';
import TimezoneEdit from 'components/timezone-edit';
import TimezoneNew from 'components/timezone-new';
import UserContainer from 'components/user-container';
import UserEdit from 'components/user-edit';
import UserNew from 'components/user-new';


export default (store) => {
  const requireAuthentication = (nextState, replaceState) => {
    const {auth} = store.getState();
    if (!auth.token) {
      replaceState({nextPathname: nextState.location.pathname}, '/login');
    }
  };

  const requireTimezonesLoaded = (nextState, replaceState) => {
    const {timezones} = store.getState();
    if (!timezones.loaded) {
      replaceState({nextPathname: nextState.location.pathname}, '/loading');
    }
  };

  const requireUsersLoaded = (nextState, replaceState) => {
    const {users} = store.getState();
    if (!users.loaded) {
      replaceState({nextPathname: nextState.location.pathname}, '/loading');
    }
  };

  return (
    <Route path='/' component={Application}>
      <Route onEnter={requireAuthentication}>
        <Route path='/loading' component={Loading}/>
        <Route path='/timezones' component={TimezoneContainer} onEnter={requireTimezonesLoaded}>
          <Route path='/timezone/:id' component={TimezoneDetail}/>
          <Route path='/timezone/:id/edit' component={TimezoneEdit}/>
          <Route path='/timezones/new' component={TimezoneNew}/>
        </Route>
        <Route path='/users' component={UserContainer} onEnter={requireUsersLoaded}>
          <Route path='/user/:id/edit' component={UserEdit}/>
          <Route path='/users/new' component={UserNew}/>
        </Route>
      </Route>
      <Route path='/login' component={Login}/>
      <Route path='/logout' component={Logout}/>
      <Route path='*' component={NotFound} status={404}/>
    </Route>
  );
};

