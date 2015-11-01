import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {find, propEq} from 'ramda';

import {deleteTimezone} from 'modules/timezones';
import Clock from 'components/clock';
import {border} from 'styles';


const findById = find(propEq('id'));


class TimezoneDetail extends Component {

  timeDifference(diff) {
    const hours = Math.abs(diff) > 1 ? 'hours' : 'hour';

    if (diff > 0) {
      return `${diff} ${hours} ahead of GMT`;
    } else if (diff < 0) {
      return `${-diff} ${hours} behind of GMT`;
    } else {
      return 'exactly as GMT';
    }
  }

  findTimezone() {
    const id = parseInt(this.props.params.id);
    return findById(id, this.props.timezones);
  }

  componentWillMount() {
    if (!this.findTimezone()) {
      const {history} = this.props;
      history.replaceState(null, '/timezones');
    }
  }

  deleteTimezone(event) {
    event.preventDefault();
    const {dispatch, history, token} = this.props;
    dispatch(deleteTimezone(token, this.findTimezone()));
    history.replaceState(null, '/timezones');
  }

  render() {
    const props = this.findTimezone();
    const color = '#444';
    return (
      <div>
        <div style={{borderBottom: border, paddingBottom: '3em', marginBottom: '1em'}}>
          <h1 style={{fontWeight: 'bold', fontSize: '4em', color: color, marginTop: '1em'}} className="text-center">{props.name}</h1>
          <h2 className="subheader text-center">{props.city}</h2>
          <div className="text-center">{this.timeDifference(props.time_difference)}</div>
          <Clock timeDifference={props.time_difference} style={{fontSize: '8em', fontWeight: 'bold', color: color}}/>
        </div>
        <div className="right">
          <ul className="button-group even-2">
            <li><Link className="button small radius" to={`/timezone/${props.id}/edit`}>Edit</Link></li>
            <li><button style={{marginLeft: '1em'}} className="button small radius" onClick={this.deleteTimezone.bind(this)}>Delete</button></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      timezones: state.timezones.timezones,
      token: state.auth.token,
    };
  }
)(TimezoneDetail);
