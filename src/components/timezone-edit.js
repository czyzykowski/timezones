import React, {Component} from 'react';
import {connect} from 'react-redux';
import {find, propEq} from 'ramda';

import TimezoneForm from 'components/timezone-form';
import {saveTimezone} from 'modules/timezones';

class TimezoneEdit extends Component {
  constructor(props) {
    super(props);

    this.timezone = this.findTimezone();
  }

  findTimezone() {
    const id = parseInt(this.props.params.id, 10);
    return find(propEq('id', id), this.props.timezones);
  }

  save(timezone) {
    const {token, dispatch} = this.props;
    dispatch(saveTimezone(token, timezone));
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      const {history} = this.props;
      history.pushState(null, `/timezone/${this.props.params.id}`);
    }
  }

  cancel(event) {
    event.preventDefault();
    this.props.history.pushState(null, `/timezone/${this.props.params.id}`);
  }

  render() {
    return (
      <TimezoneForm
        onSave={this.save.bind(this)}
        onCancel={this.cancel.bind(this)}
        loading={this.props.loading}
        timezone={this.timezone}/>
    );
  }
}

export default connect(
  state => {
    return {
      timezones: state.timezones.timezones,
      loading: state.timezones.loading,
      token: state.auth.token
    };
  }
)(TimezoneEdit);
