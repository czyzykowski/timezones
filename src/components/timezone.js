import React, {Component} from 'react';
import {Link} from 'react-router';

import Row from 'components/row';
import Clock from 'components/clock';
import {border} from 'styles';


class Timezone extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: false};
  }

  setHover() {
    this.setState({hover: true});
  }

  unsetHover() {
    this.setState({hover: false});
  }

  backgroundColor() {
    return this.state.hover ? '#efefef' : '#fff';
  }

  render() {
    let owner;
    if (this.props.admin) {
      owner = (<span style={{marginLeft: '1em', color: '#aaa'}}>({this.props.owner})</span>);
    }

    return (
      <div style={{backgroundColor: this.backgroundColor()}}
           onMouseEnter={this.setHover.bind(this)}
           onMouseLeave={this.unsetHover.bind(this)}>
        <Link to={`/timezone/${this.props.id}`}>
          <Row style={{borderBottom: border, backgroundColor: this.backgroundColor()}}>
            <h3 style={{marginTop: '1em'}}>{this.props.name}</h3>
            <div className="left">{this.props.city}{owner}</div>
            <div className="right"><Clock timeDifference={this.props.time_difference} style={{color: '#777'}}/></div>
          </Row>
        </Link>
      </div>
    );
  }
}

export default Timezone;
