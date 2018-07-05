import React from 'react';
import Routes from './routes.jsx';
import firebase from 'firebase';
import { db } from './exports.js';
import { addNewUser, searchForUser } from './components/Users/function.js';
import MainNav from './components/navbar/MainNav.jsx';

class App extends React.Component {
  state = {
    user: {},
    currentMap: '',
  };
  selectMap = async map => {
    this.setState({
      currentMap: map,
    });
    await db
      .collection('Users')
      .doc(this.state.user.metadata.email)
      .update({
        lastProject: map,
      });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const exists = await searchForUser(user.email);
        if (!exists) {
          await addNewUser(
            {
              name: user.displayName,
              email: user.email,
              uid: user.uid,
            },
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
<<<<<<< HEAD
          <MainNav
            currentMap={this.state.currentMap} user={this.state.user}
          />
=======
          <MainNav currentMap={this.state.currentMap} user={this.state.user} />
>>>>>>> 3d29609096db9cdbdd4008f7b2db6555750c6e27
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
