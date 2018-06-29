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
<<<<<<< HEAD
            const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
=======
            //const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
>>>>>>> f4362faa4af1d3c36e392887d2ad08601f553bf1
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
<<<<<<< HEAD
          <MainNav currentMap={this.state.currentMap} />
=======
          <MainNav
            currentMap={this.state.currentMap}
          />
>>>>>>> f4362faa4af1d3c36e392887d2ad08601f553bf1
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
