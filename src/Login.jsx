import React, { Component } from 'react';
import { ui, uiConfig } from './exports.js';

class Login extends Component {
  componentDidMount() {
    ui.start('#firebaseui-auth-container', uiConfig);
  }
  render() {
    return (
      <div>
        <h1>Bloom</h1>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
