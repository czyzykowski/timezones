import React, {Component} from 'react';
import {connect} from 'react-redux';

import Row from 'components/row';
import Column from 'components/column';
import Navigation from 'components/navigation';

class Application extends Component {

  loggedIn() {
    return Boolean(this.props.auth.token);
  }

  render() {
    const links = [];

    if (this.loggedIn()) {
      if (this.props.role === 'admin') {
        links.push({name: 'Users', to: '/users'});
      }
      links.push({name: 'Logout', to: '/logout'});
    }

    return (
      <div>
        <Row style={{marginBottom: '2em'}}>
          <Column size="large-12">
            <Navigation links={links}/>
          </Column>
        </Row>
        <Row>
          <Column size="large-12">
            {this.props.children}
          </Column>
        </Row>
      </div>
    );
  }
}

export default connect(state => {
  return {
    auth: state.auth,
    role: state.user.role
  };
})(Application);
