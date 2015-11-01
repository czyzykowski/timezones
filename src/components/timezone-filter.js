import React, {Component} from 'react';

import Column from 'components/column';
import Row from 'components/row';
import {border} from 'styles';


class TimezoneFilter extends Component {

  render() {
    return (
      <Row>
        <Column style={{borderBottom: border, marginTop: '2em'}}>
          <input type="text" placeholder="Enter text to filter timezones" onChange={this.props.onChange}/>
        </Column>
      </Row>
    );
  }
}

export default TimezoneFilter;
