import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser } from './function.js';
import ProjectCard from './projectCard';

class Dashboard extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.setState({
          user: user,
        });
        const exists = await searchForUser(user.uid);
        if (!exists) {
          console.log('running?');
          addNewUser({ name: user.displayName, email: user.email }, user.uid);
        }
      } else {
        console.log('no one signed in');
      }
    });
  }
  render() {
    if (!this.state.user.displayName) return <div>Loading...</div>;
    return (
      <div>
        <ProjectCard />
      </div>
    );
  }
}

export default Dashboard;
