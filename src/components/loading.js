import React, {Component} from 'react';
import {connect} from 'react-redux';
import {find, propEq} from 'ramda';

import Row from 'components/row';
import Column from 'components/column';
import {resetTimezones} from 'modules/timezones';
import {resetUsers} from 'modules/users';
import {loadUser} from 'modules/user';


class Loading extends Component {

  constructor(props) {
    super(props);
    this.items = [{
      name: 'User data',
      done: false,
      prop: 'userLoaded',
      next: this.loadTimezones.bind(this),
    }];
  }

  componentWillMount() {
    const {dispatch, token} = this.props;
    dispatch(loadUser(token))
  }

  loadTimezones(props) {
    const {dispatch, token} = this.props;
    this.items.push({
      name: 'Timezones',
      done: false,
      prop: 'timezonesLoaded',
      next: props.role === 'admin' ? this.loadUsers.bind(this) : this.allLoaded.bind(this),
    }
    );
    dispatch(resetTimezones(token));
  }

  loadUsers(props) {
    const {dispatch, token} = this.props;
    this.items.push({
      name: 'Users',
      done: false,
      prop: 'usersLoaded',
      next: this.allLoaded.bind(this),
    });
    dispatch(resetUsers(token));
  }

  allLoaded() {
    const {location, history} = this.props;
    if (location.state && location.state.nextPathname) {
      history.replaceState(null, location.state.nextPathname);
    } else {
      history.replaceState(null, '/timezones');
    }
  }

  componentWillReceiveProps(nextProps) {
    const pending = this.items.slice(-1)[0];
    // Finished loading that part, process it
    if (nextProps[pending.prop]) {
      pending.done = true;
      // call setup for the next bit
      pending.next(nextProps);
    }
  }

  render() {
    const items = this.items.map((item, index) => {
      return (<h4 key={index} className="text-center">{item.name}...{item.done ? 'done' : ''}</h4>);
    });
    return (
      <Row>
        <Column size="large-4" options="centered">
          <h1 className="text-center">Loading...</h1>
          {items}
        </Column>
      </Row>
    );
  }
}

export default connect(
  (state) => {
    return {
      timezonesLoaded: state.timezones.loaded,
      userLoaded: state.user.loaded,
      usersLoaded: state.users.loaded,
      role: state.user.role,
      loaded: [state.timezones.loaded, state.user.loaded],
      token: state.auth.token,
    };
  }
)(Loading);
