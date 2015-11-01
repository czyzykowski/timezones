import React, {Component} from 'react';
import {clone} from 'ramda';

import Row from 'components/row';
import Column from 'components/column';


class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = this.resetData();
  }

  resetData() {
    return {
      id: this.props.user.id,
      username: this.props.user.username,
      password: this.props.user.password,
      is_staff: this.props.user.is_staff,
    };
  }

  handleStateChange(property, event) {
    this.setState({[property]: event.target.value});
  }

  save(event) {
    event.preventDefault();
    let user = clone(this.state);
    user.id = this.props.user.id;
    this.props.onSave(user);
  }

  render() {
    return (
      <form role="form" action="" style={{marginTop: '3em'}}>
        <Row>
          <Column>
            <h1>{this.state.username}&nbsp;</h1>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Username:
              <input type="text" onChange={this.handleStateChange.bind(this, 'username')} value={this.state.username}/>
            </label>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Password:
              <input type="password" onChange={this.handleStateChange.bind(this, 'password')} value={this.state.password}/>
            </label>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Role:
              <select onChange={this.handleStateChange.bind(this, 'role')} value={this.state.is_staff}>
                <option value={true}>admin</option>
                <option value={false}>user</option>
              </select>
            </label>
          </Column>
        </Row>
        <Row>
          <Column size="large-12">
            <div className="right">
              <ul className="button-group even-2">
                <li>
                  <button
                    className="button small radius"
                    onClick={this.props.onCancel}>
                    Cancel
                  </button>
                </li>
                <li>
                  <button
                    type="submit"
                    style={{marginLeft: '1em'}}
                    className="button small radius"
                    onClick={this.save.bind(this)}
                    disabled={this.props.loading}>
                    Save
                  </button>
                </li>
              </ul>
            </div>
          </Column>
        </Row>
      </form>
    );
  }
}

export default UserForm;
