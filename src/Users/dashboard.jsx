import React from 'react';
import firebase from 'firebase';
import { addNewUser } from './function.js';

class Dashboard extends React.Component {
  render() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        addNewUser({ name: user.displayName, email: user.email }, user.uid);
      } else {
        console.log('no one signed in');
      }
    });
    return <div>Hello</div>;
  }
}

export default Dashboard;
