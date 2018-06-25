import React, { Component } from 'react';
const firebase = require('firebase');

class Login extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to My Awesome App</h1>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

export default Login;
