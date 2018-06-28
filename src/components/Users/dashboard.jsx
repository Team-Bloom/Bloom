import React from 'react';
import firebase from 'firebase';
import { addNewUser, searchForUser, addNewProject } from './function.js';
import ProjectCard from './projectCard';
import './user.css'
import { Link } from 'react-router-dom';
import { db } from '../../index.js';
import history from '../../history';
import DeleteProjectPanel from './DeleteProjectPanel.jsx'

class Dashboard extends React.Component {
  constructor() {
    super()

    this.state = {
      projectName: '',
      nameInput: '',
      project: '',

    }

    this.areYouSure = this.areYouSure.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async addProject(user) {
    const id = await addNewProject(user);
    history.push(`/map/${id}`);
  }

  areYouSure(project) {
    this.setState({
      projectName: project.title,
      project: project
    })
  }

  handleChange(event) {
    this.setState({
      nameInput: event.target.value
    })

    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault();

   if (event.target.name === 'delete-btn') {
    console.log(event.target.name)

    // if (this.state.projectName === this.state.projectInput) {
      console.log(this.state.project.projectId)


    }
  // }
    // this.setState({
    //   projectName: '',
    //   nameInput: ''
    // })
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
              <div key={projects[project].projectId} className="project-card-container">
                <Link to={`/map/${projects[project].projectId}`}>
                  <ProjectCard project={projects[project]} />
                </Link>

                <button type="submit" className="delete-btn" onClick={() => this.areYouSure(projects[project])}>Delete project
                </button>
              </div>
            );
          })}
        </div>
        { this.state.projectName.length ?
                <DeleteProjectPanel handleChange={this.handleChange} handleSubmit={this.handleSubmit} nameInput={this.state.nameInput} /> :
                <div />
                }
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
