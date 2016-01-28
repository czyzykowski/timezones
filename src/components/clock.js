import React, {Component} from 'react';
import moment from 'moment';

const LOCAL_TIME_DIFFERENCE = -3;

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {time: this.renderTime()};
  }

  componentWillMount() {
    this.interval = setInterval(this.tick.bind(this), 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const time = this.renderTime();
    this.setState({time});
  }

  renderTime() {
    const m = moment();
    const d = LOCAL_TIME_DIFFERENCE;

    m.add(this.props.timeDifference - d, 'hours');

    return m.format('H:mm:ss');
  }

  render() {
    return (
      <div className="text-center" style={this.props.style}>
        {this.state.time}
      </div>
    );
  }
}

export default Clock;
