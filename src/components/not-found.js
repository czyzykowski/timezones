import React, {Component} from 'react';

import Row from 'components/row';
import Column from 'components/column';


class NotFound extends Component {

  render() {
    return (
      <Row>
        <Column>
          <h1 className="text-centered">404 Not Found</h1>
        </Column>
      </Row>
    );
  }
}

export default NotFound;
