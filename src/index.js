import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import config from './firebaseConfig';
import { addNewUser } from './Users/function.js';
require('firebase/firestore');
const firebaseui = require('firebaseui');

firebase.initializeApp(config);
export const test = firebase.auth;
// export const test = firebase.auth;
export const db = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      console.log(authResult);
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/nav',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
};
ui.start('#firebaseui-auth-container', uiConfig);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
