import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser, addNewProject } from './function.js';
import ProjectCard from './projectCard';
import { Link } from 'react-router-dom';
import { db } from '../../index.js';
import history from '../../history';

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
        console.log(this.props.user)
        this.props.getuser(data)
      } else {
        console.log('no one signed in');
      }
    });
  }

  async addProject(user) {
    const id = await addNewProject(user);
    history.push(`/map/${id}`);
  }

  render() {
    if (!this.state.user.metadata) return <div>Loading...</div>;
    const projects = this.state.user.projects;
    const keys = Object.keys(projects);
    return (
      <div id="flexCol">
        <div className="projSet">
          {keys.map(project => {
            return (
              <div key={projects[project].projectId}>
                <Link to={`/map/${projects[project].projectId}`}>
                  <ProjectCard project={projects[project]} />
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => this.addProject(this.state.user)}
            className="add-btn"
          >
            Add new project
          </button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
