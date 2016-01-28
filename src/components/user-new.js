import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserForm from 'components/user-form';
import {addUser} from 'modules/users';

class UserNew extends Component {

  save(user) {
    const {token, dispatch, history} = this.props;
    dispatch(addUser(token, user));
    history.pushState(null, '/users');
  }

  cancel(event) {
    event.preventDefault();
    const {history} = this.props;
    history.pushState(null, '/users');
  }

  render() {
    const user = {
      username: '',
      is_staff: false // eslint-disable-line camelcase
    };
    return (
      <UserForm
        onSave={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
        loading={this.props.loading}
        user={user}/>
    );
  }
}

export default connect(
  state => {
    return {
      loading: state.users.loading,
      token: state.auth.token
    };
  }
)(UserNew);
