import React, {Component} from 'react';
import {clone} from 'ramda';

import Row from 'components/row';
import Column from 'components/column';


class TimezoneForm extends Component {

  constructor(props) {
    super(props);

    this.state = this.resetData();
  }

  resetData() {
    return {
      id: this.props.timezone.id,
      name: this.props.timezone.name,
      city: this.props.timezone.city,
      time_difference: this.props.timezone.time_difference
    };
  }

  handleStateChange(property, event) {
    this.setState({[property]: event.target.value});
  }

  save(event) {
    event.preventDefault();
    let timezone = clone(this.state);
    timezone.id = this.props.timezone.id;
    this.props.onSave(timezone);
  }

  render() {
    return (
      <form role="form" action="" style={{marginTop: '3em'}}>
        <Row>
          <Column>
            <h1>{this.state.name}&nbsp;</h1>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Name:
              <input type="text" onChange={this.handleStateChange.bind(this, 'name')} value={this.state.name}/>
            </label>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>City:
              <input type="text" onChange={this.handleStateChange.bind(this, 'city')} value={this.state.city}/>
            </label>
          </Column>
        </Row>
        <Row>
          <Column>
            <label>Time difference:
              <input type="number" onChange={this.handleStateChange.bind(this, 'time_difference')} value={this.state.time_difference}/>
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

export default TimezoneForm;
