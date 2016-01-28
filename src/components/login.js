import React, {Component} from 'react';
import {connect} from 'react-redux';

import Row from 'components/row';
import Column from 'components/column';
import {login} from 'modules/auth';

class Login extends Component {
  constructor() {
    super();
    this.state = {username: '', password: ''};
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.token) {
      const {location, history} = this.props;
      if (location.state && location.state.nextPathname) {
        history.replaceState(null, location.state.nextPathname);
      } else {
        history.replaceState(null, '/timezones');
      }
    }
  }

  login(event) {
    event.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }

  render() {
    let error = null;
    if (this.props.auth.loginError) {
      error = (<small className="error">{this.props.auth.loginError}</small>);
    }
    return (
      <form role="form" action="">
        <Row>
          <Column size="large-6" options="centered">
            <h1 style={{marginTop: '2em'}}>Login to Timezones</h1>
            {error}
            <label>Username:
              <input type="text" onChange={this.handleUsernameChange.bind(this)} value={this.state.username} />
            </label>
          </Column>
        </Row>
        <Row>
          <Column size="large-6" options="centered">
            <label>Password:
              <input type="password" onChange={this.handlePasswordChange.bind(this)} value={this.state.password} />
            </label>
          </Column>
        </Row>
        <Row>
          <Column size="large-6" options="centered">
            <button type="submit" className="button small"
                    disabled={this.props.auth.loggingIn}
                    onClick={this.login.bind(this)}>
              Login
            </button>
          </Column>
        </Row>
      </form>
    );
  }
}

export default connect(
  state => {
    return {
      auth: state.auth
    };
  }
)(Login);
