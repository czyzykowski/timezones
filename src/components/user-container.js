import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import Row from 'components/row';
import Column from 'components/column';
import {deleteUser} from 'modules/users';


class UserContainer extends Component {

  deleteUser(user, event) {
    event.preventDefault();
    const {dispatch, token} = this.props;
    dispatch(deleteUser(token, user));
  }

  renderUser(user) {
    return (
      <tr key={user.id}>
        <td>{user.username}</td>
        <td>{user.is_staff ? 'admin' : 'user'}</td>
        <td><Link to={`/user/${user.id}/edit`}>edit</Link></td>
        <td><a onClick={this.deleteUser.bind(this, user)}>delete</a></td>
      </tr>
    );
  }

  newUser(event) {
    event.preventDefault();
  }

  newUserButton() {
    const children = this.props.children;
    if (!children || children.length == 0) {
      return (
        <Link className="button small radius right" to="/users/new">New user</Link>
      );
    }
  }

  render() {
    return (
      <Row>
        <Column size="large-6" options="centered">
          <table style={{width: '100%', marginTop: '2em'}}>
            <thead>
              <tr>
                <th>username</th>
                <th>role</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(this.renderUser, this)}
            </tbody>
          </table>
          {this.newUserButton()}
          {this.props.children}
        </Column>
      </Row>
    );
  }
}

export default connect(
  (state) => {
    return {
      users: state.users.users,
      token: state.auth.token,
    };
  }
)(UserContainer);
