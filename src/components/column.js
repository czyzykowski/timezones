import React from 'react';
import cx from 'classnames';

export default class Column extends React.Component {
  render() {
    const size = this.props.size || 'large-12';

    let options = this.props.options || '';

    if (options === 'centered') {
      options = `${size.split('-')[0]}-centered`;
    }

    return (
      <div className={cx(size, options, 'columns', this.props.className)} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }
}
