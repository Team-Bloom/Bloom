import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser } from './function.js';

class Dashboard extends React.Component {
  render() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const exists = await searchForUser(user.uid);
        if (!exists) {
          addNewUser({ name: user.displayName, email: user.email }, user.uid);
        }
      } else {
        console.log('no one signed in');
      }
    });

    return <div>Hello</div>;
  }
}

export default Dashboard;
