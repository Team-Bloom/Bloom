import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser, addNewProject } from './function.js';
import ProjectCard from './projectCard';
import { Link } from 'react-router-dom';
import { db } from '../../index.js';
import history from '../../history';

class Dashboard extends React.Component {
  async addProject(user) {
    const id = await addNewProject(user);
    history.push(`/map/${id}`);
  }

  render() {
    if (!this.props.user.metadata) return <div>Loading...</div>;
    const projects = this.props.user.projects;
    const keys = Object.keys(projects);
    return (
      <div id="flexCol">
        <div className="projSet">
          {keys.map(project => {
            return (
              <div key={projects[project].projectId}>
                <Link
                  onClick={() =>
                    this.props.selectMap(projects[project].projectId)
                  }
                  to={`/map/${projects[project].projectId}`}
                >
                  <ProjectCard project={projects[project]} />
                </Link>
              </div>
            );
          })}
        </div>
        <div>
          <button
            onClick={() => this.addProject(this.props.user)}
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
