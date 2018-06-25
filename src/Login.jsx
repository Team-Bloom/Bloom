import React, { Component } from 'react';
import { ui, uiConfig } from './index.js';

class Login extends Component {
  render() {
    ui.start('#firebaseui-auth-container', uiConfig);

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
