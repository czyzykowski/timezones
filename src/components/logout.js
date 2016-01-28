import React, {Component} from 'react';
import {connect} from 'react-redux';

import {logout} from 'modules/auth';

class Logout extends Component {

  componentWillMount() {
    const {dispatch, history} = this.props;
    dispatch(logout());
    history.replaceState(null, '/login');
  }

  render() {
    return (<h1>You have been logged out</h1>);
  }
}

export default connect()(Logout);
