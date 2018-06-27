import React from 'react';
import Routes from './routes.jsx';
import firebase from 'firebase';
import { db } from './index.js';
import {
  addNewUser,
  searchForUser,
  addNewProject,
} from './components/Users/function.js';

class App extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const exists = await searchForUser(user.email);
        if (!exists) {
          await addNewUser(
            { name: user.displayName, email: user.email, uid: user.uid },
            user.email
          );
        }
        const userObj = await db
          .collection('Users')
          .doc(user.email)
          .get();
        const data = userObj.data();
        this.setState({
          user: data,
        });
      } else {
        console.log('no one signed in');
      }
    });
  }

  render() {
    return (
      <div id="app">
        <div>
          <Routes user={this.state.user} />
        </div>
      </div>
    );
  }
}

export default App;
