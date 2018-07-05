import React, { Component } from 'react';
import SaveProjectForm from '../navbar/SaveProjectForm.jsx';
import AddCollaboratorForm from '../navbar/AddCollaboratorForm.jsx';
import { db } from '../../exports.js';
import { Link } from 'react-router-dom';
import {
  displayForm,
  removeForm,
  checkUnique,
  updateUserProjects,
} from '../navbar/functions.js';
import { mostRecentlyUpdated } from '../Users/function';
import './toolbar.css';

const styles = {
  container: {
    // display: 'flex',
    // backgroundColor: 'gray',
    // justifyContent: 'space-between',
    // paddingLeft: '1%',
    // paddingRight: '1%',
    // height: '5vh',
    // alignItems: 'center',
  },
  left: {
    // display: 'flex',
    // justifyContent: 'space-between',
    // width: '9%',
  },
  link: {
    // color: 'white',
    // fontSize: '1.3em',
    // cursor: 'pointer',
  },
  title: {
    // marginRight: '10px',
  },
  icon: {
    // margin: '5px',
  },
};

class Toolbar extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      recipientEmail: '',
      projectName: '',
      nonExistentCollaboratorsEmail: '',
      userProjects: [],
      project: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    // this.showProject = this.showProject.bind(this)
    // this.toggleProjects = this.toggleProject.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      nonExistentCollaboratorsEmail: '',
    });
  }

  showProjects() {
    const projects = this.props.user.projects;
    let listOfUserProjectNames = [];

    for (let k in projects) {
      listOfUserProjectNames.push({
        projectName: k,
        title: projects[k].title,
        lastUpdated: projects[k].lastUpdated,
      });
    }

    // if (listOfUserProjectNames.length >= 3) {
    //   return mostRecentlyUpdated(listOfUserProjectNames)
    // }
    return listOfUserProjectNames;
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.persist();

    const projectId = this.props.projectId;
    const projectData = await db
      .collection('Projects')
      .doc(this.props.projectId)
      .get();
    const metadata = projectData.data().metadata;
    const collaborators = metadata.collaborators;

    if (event.target.name === 'collab-btn') {
      const userData = await db
        .collection('Users')
        .doc(this.state.recipientEmail)
        .get();
      const foundUser = userData.data();
      console.log('user', foundUser);

      if (!foundUser) {
        this.setState({
          nonExistentCollaboratorsEmail: this.state.recipientEmail,
        });
      }

      if (!this.state.nonExistentCollaboratorsEmail) {
        const alreadyAddedUser = checkUnique(
          collaborators,
          this.state.recipientEmail,
          this.state.userEmail
        ).length;
        if (alreadyAddedUser) {
          document.getElementById('collab-form').classList.toggle('show');
        }
        if (!alreadyAddedUser) {
          await db
            .collection('Projects')
            .doc(this.props.projectId)
            .update({
              'metadata.collaborators': [
                ...collaborators,
                {
                  name: foundUser.metadata.name,
                  email: this.state.recipientEmail,
                },
              ],
            });

          const allCollaborators = [
            ...collaborators,
            {
              name: foundUser.metadata.name,
              email: this.state.recipientEmail,
            },
          ];
          const projectTitle = metadata.title;

          updateUserProjects(
            allCollaborators,
            db,
            projectId,
            this.state.userEmail,
            projectTitle
          );

          // window.open(
          //   `mailto:${
          //     this.state.recipientEmail
          //   }?subject=Invite to collaborate on a Bloom project&body=${
          //     this.state.userName
          //   } has invited you to collaborate on a project`
          // );
          document.getElementById('collab-form').classList.toggle('show');
        }
      }
    } else if (event.target.name === 'save-btn') {
      await db
        .collection('Projects')
        .doc(this.props.projectId)
        .update({
          ['metadata.title']: this.state.projectName,
        });

      updateUserProjects(
        collaborators,
        db,
        projectId,
        this.state.userEmail,
        this.state.projectName
      );
      document.getElementById('save-form').classList.toggle('show');
    }
  }

  hideForm() {
    removeForm();
  }

  showForm(action) {
    this.setState({
      recipientEmail: '',
      projectName: '',
    });
    displayForm(action);
  }

  render() {
    console.log(this.props);

    if (!this.props.project || !this.props.user.projects)
      return <div>Loding...</div>;
    let project = this.props.project;
    if (this.state.project.metadata) {
      project = this.state.project;
    }
    return (
      <div id="tool-container" className="tool-container">
        <div id="tool-left" className="tool-left" style={styles.left}>
          <div className="project-info">
            <h1 id="title" className="title">
              {project.metadata.title} Mind Map
            </h1>
            <span className="collaborators">{`${project.metadata.collaborators.reduce(
              (acc, el) => {
                return acc + el.name;
              },
              ' | '
            )}`}</span>
            <AddCollaboratorForm
              showForm={this.showForm}
              handleChange={this.handleChange}
              recipientName={this.state.recipientName}
              recipientEmail={this.state.recipientEmail}
              handleSubmit={this.handleSubmit}
              collabName={this.state.nonExistentCollaboratorsEmail}
            />
          </div>
          <div>
            <SaveProjectForm
              showForm={this.showForm}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              projectName={this.state.projectName}
            />
            <button
              type="button"
              className="button"
              onClick={this.props.goBack}
              disabled={this.props.project.history.length < 2}
            >
              Map Undo
            </button>
            <button
              type="button"
              className="button"
              disabled={this.props.project.forward.length < 1}
              onClick={this.props.goForward}
            >
              Map Redo
            </button>
          </div>
        </div>
        <div id="tool-right" className="tool-right">
          <div className="current-projects">
            <h2 className="current-projects-text">Recent projects </h2>
            {this.showProjects().map(projects => {
              return (
                <Link
                  className="button"
                  to={`/map/${projects.projectName}`}
                  onClick={() => this.props.selectMap(projects.projectName)}
                >
                  <span className="project-list">{projects.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;
