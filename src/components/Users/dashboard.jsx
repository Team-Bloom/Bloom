import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser } from './function.js';
import ProjectCard from './projectCard';
import { Link } from 'react-router-dom';
import { db } from '../index.js';

class Dashboard extends React.Component {
  state = {
    user: {},
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        const exists = await searchForUser(user.uid);
        if (!exists) {
          console.log('running?');
          await addNewUser({ name: user.displayName, email: user.email }, user.uid);
        }
        const userObj = await db.collection('Users').doc(user.uid).get()
        const data = userObj.data()
        console.log("Line 22 userObj", data)
        this.setState({
          user: data
        })
      } else {
        console.log('no one signed in');
      }
    });
  }
  render() {
    if (!this.state.user.metadata) return <div>Loading...</div>;
    return (
      <div>
        {this.state.user.projects.map(project => {
          return (
            <div key={project.projectId}>
              <Link to={`/map/${project.projectId}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
