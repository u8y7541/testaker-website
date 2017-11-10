import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import header from '../utils/header';
import loggedIn from '../utils/loggedIn';

import './Homepage.css';

export default class App extends Component {
  logout() {
    window.localStorage.removeItem('TestakerToken')
    window.location.reload()
  }

  render() {
    return (
      <div>
        {header('Tests "Я" Us', 'Testing made easy.')}
        <div className = "container">
          <br />
          <div className = 'centered'>
            <div>
              <Link className = "button" to = "/createTest">Create a test</Link>
            </div>

            <div>
              {loggedIn()?
                <p className = "button" onClick = {this.logout}>Logout</p>
                :
                <Link className = "button" to = "/login">Login</Link>
              }
            </div>

            <div>
              <Link className = "button" to = "/createAccount">Register</Link>
            </div>

            <div>
              <Link className = "button" to = "/monitor">Monitor a test</Link>
            </div>

            <div>
              <Link className = "button" to = "/results">View results</Link>
            </div>
          </div>
        </div>

        { this.props.children }
      </div>
    );
  }
}
