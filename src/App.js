import React from 'react';
import Routes from './routes.jsx';
import firebase from 'firebase';
import { db } from './index.js';
import {
  addNewUser,
  searchForUser,
} from './components/Users/function.js';
import MainNav from './components/navbar/MainNav.jsx';

class App extends React.Component {
  state = {
    user: {},
    currentMap: '',
  };
  selectMap = map => {
    this.setState({
      currentMap: map,
    });
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
        this.unsubscribe = db
          .collection('Users')
          .doc(user.email)
          .onSnapshot(doc => {
            //const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
            return this.setState({
              user: doc.data(),
            });
          });
      } else {
        console.log('no one signed in');
      }
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div id="app">
        <div>
          <MainNav
            currentMap={this.state.currentMap}
          />
          <Routes
            user={this.state.user}
            selectMap={map => this.selectMap(map)}
          />
        </div>
      </div>
    );
  }
}

export default App;
