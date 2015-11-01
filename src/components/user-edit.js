import React, {Component} from 'react';
import {connect} from 'react-redux';
import {find, propEq} from 'ramda';

import {saveUser} from 'modules/users';
import UserForm from 'components/user-form';


class UserEdit extends Component {

  constructor(props) {
    super(props);
    this.user = this.findUser();
  }

  findUser() {
    const id = parseInt(this.props.params.id, 10);
    return find(propEq('id', id), this.props.users);
  }

  save(user) {
    const {token, dispatch} = this.props;
    dispatch(saveUser(token, user));
  }

  redirect() {
    const {history} = this.props;
    history.pushState(null, '/users');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.redirect();
    }
  }

  cancel(event) {
    event.preventDefault();
    this.redirect();
  }

  render() {
    return (
      <UserForm
        onSave={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
        user={this.user}/>
    );
  }
}

export default connect(
  (state) => {
    return {
      users: state.users.users,
      loading: state.users.loading,
      token: state.auth.token,
    };
  }
)(UserEdit);
