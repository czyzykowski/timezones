import React, {Component} from 'react';
import {connect} from 'react-redux';

import Row from 'components/row';
import Column from 'components/column';
import TimezoneList from 'components/timezone-list';


class TimezoneContainer extends Component {

  isAdmin() {
    return this.props.role === 'admin';
  }

  render() {
    return (
      <Row>
        <Column size="large-4">
          <TimezoneList timezones={this.props.timezones} admin={this.isAdmin()}/>
        </Column>
        <Column size="large-8">
          {this.props.children}
        </Column>
      </Row>
    );
  }
}

export default connect(
  (state) => {
    return {
      timezones: state.timezones.timezones,
      role: state.user.role,
    };
  }
)(TimezoneContainer);
