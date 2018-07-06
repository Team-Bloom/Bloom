import React, { Component } from 'react';
import { ui, uiConfig } from './exports.js';
import logo from './darkbackgroundbloom.svg';

class Login extends Component {
  componentDidMount() {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
    return (
      <div
      // style={{
      //   display: 'flex',
      //   flexDirection: 'column',
      //   justifyContent: 'center',
      // }}
      >
        <img
          src={logo}
          alt="hi"
          style={{
            width: '14vw',
            marginTop: '8vh',
            marginLeft: '43vw',
            // marginRight: '50vw',
          }}
        />
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
