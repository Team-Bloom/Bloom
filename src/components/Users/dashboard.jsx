import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser } from './function.js';
import ProjectCard from './projectCard';
import { Link } from 'react-router-dom';
import { db } from '../../index.js';

class Dashboard extends React.Component {
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
    if (!this.state.user.metadata) return <div>Loading...</div>;
    const projects = this.state.user.projects;
    const keys = Object.keys(projects);
    return (
      <div>
        {keys.map(project => {
          return (
            <div key={projects[project].projectId}>
              <Link to={`/map/${projects[project].projectId}`}>
                <ProjectCard project={projects[project]} />
              </Link>
              <button className="add-btn">Add new project</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Dashboard;
