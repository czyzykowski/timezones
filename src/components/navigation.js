import React, {Component} from 'react';
import {Link} from 'react-router';

class Navigation extends Component {

  render() {
    const links = this.props.links.map(link => (
        <li key={link.name}>
          <Link to={link.to}>{link.name}</Link>
        </li>
      )
    );

    return (
      <div className="fixed">
        <nav className="top-bar">
          <ul className="title-area">
            <li className="name">
              <h1><Link to="/timezones">Timezones</Link></h1>
            </li>
          </ul>

          <section className="top-bar-section">
            <ul className="right">
              {links}
            </ul>
          </section>
        </nav>
      </div>
    );
  }
}

export default Navigation;
