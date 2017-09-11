import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className = "header">
          <p>Tests "Я" Us</p>
          <p style = {{fontSize: '35px'}}>Testing made easy.</p>
        </div>

        <div className = "container">
          <p style = {{textAlign: 'center'}}></p>
          <br />
          <div style = {{textAlign: "center"}}>
            <div style = {{float: "left"}}>
              <Link className = "button" to = "/createTest">Create a test</Link>
            </div>

            <div style = {{float: "left"}}>
              <Link className = "button" to = "/login">Login</Link>
            </div>

            <div style = {{float: "left"}}>
              <Link className = "button" to = "/">Monitor a test</Link>
            </div>

            <div style = {{float: "left"}}>
              <Link className = "button" to = "/">View results</Link>
            </div>
          </div>
        </div>

        { this.props.children }
      </div>
    );
  }
}
