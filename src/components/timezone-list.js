import React, {Component} from 'react';
import {Link} from 'react-router';

import Column from 'components/column';
import Row from 'components/row';
import Timezone from 'components/timezone';
import TimezoneFilter from 'components/timezone-filter';

class TimezoneList extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: ''};
  }

  filterChange({target}) {
    this.setState({filter: target.value});
  }

  filteredTimezones() {
    const {timezones} = this.props;
    const filter = this.state.filter.toLowerCase();

    if (!filter) {
      return timezones;
    }

    return timezones.filter(({name}) => {
      return name.toLowerCase().indexOf(filter) !== -1;
    });
  }

  filterNode() {
    if (this.props.timezones.length > 0) {
      return (
        <TimezoneFilter onChange={this.filterChange.bind(this)}/>
      );
    }
    return null;
  }

  render() {
    const nodes = this.filteredTimezones().map(timezone => (
      <Timezone key={timezone.id} {...timezone} admin={this.props.admin}/>
    ));

    return (
      <div>
        {this.filterNode()}
        {nodes}
        <Row style={{marginTop: '3em'}}>
          <Column className="text-center">
            <Link
              className="button small radius"
              to={'/timezones/new'}>New timezone</Link>
          </Column>
        </Row>
      </div>
    );
  }
}

export default TimezoneList;
