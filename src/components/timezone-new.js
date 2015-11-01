import React, {Component} from 'react';
import {connect} from 'react-redux';

import TimezoneForm from 'components/timezone-form';
import {addTimezone} from 'modules/timezones';


class TimezoneNew extends Component {

  save(timezone) {
    const {token, dispatch, history} = this.props;
    dispatch(addTimezone(token, timezone));
    history.pushState(null, '/timezones');
  }

  cancel(event) {
    event.preventDefault();
    const {history} = this.props;
    history.pushState(null, '/timezones');
  }

  render() {
    const timezone = {
      name: '',
      city: '',
      time_difference: 0,
    };
    return (
      <TimezoneForm
        onSave={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
        loading={this.props.loading}
        timezone={timezone}
      />
    );
  }
}

export default connect(
  (state) => {
    return {
      loading: state.timezones.loading,
      token: state.auth.token,
    };
  }
)(TimezoneNew);
