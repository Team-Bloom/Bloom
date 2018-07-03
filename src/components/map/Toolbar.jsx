import React, { Component } from 'react';
import SaveProjectForm from '../navbar/SaveProjectForm.jsx';
import AddCollaboratorForm from '../navbar/AddCollaboratorForm.jsx';
import { db } from '../../exports.js';
import { Link } from 'react-router-dom'
import {
  displayForm,
  removeForm,
  checkUnique,
  updateUserProjects,
} from '../navbar/functions.js';

const styles = {
  container: {
    display: 'flex',
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    paddingLeft: '1%',
    paddingRight: '1%',
    height: '5vh',
    alignItems: 'center',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    // width: '9%',
  },
  link: {
    color: 'white',
    fontSize: '1.3em',
    cursor: 'pointer',
  },
  title: {
    marginRight: '10px',
  },
  icon: {
    margin: '5px',
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
      userProjects: []
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
    const projects = this.props.user.projects
    const listOfUserProjectNames = []

    for (let k in projects) {
        listOfUserProjectNames.push({projectName: k, title: projects[k].title})

    }
    return listOfUserProjectNames
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
      projectName: ''
    })
    displayForm(action);
  }

  render() {
   console.log(this.props)

    if (!this.props.project || !this.props.user.projects) return <div>Loding...</div>;
    return (
      <div
        id="tool-container"
        style={{
          ...styles.container,
          position: 'fixed',
          width: '100%',
          top: '5vh',
        }}
      >
        <div id="tool-left" style={styles.left}>
          <span id="title" style={{ ...styles.link, ...styles.title }}>
            {this.props.project.metadata.title}
          </span>
          <SaveProjectForm
            showForm={this.showForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            projectName={this.state.projectName}
          />
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
          <button
            type="button"
            onClick={this.props.goBack}
            disabled={this.props.project.history.length < 2}
          >
            Back
          </button>
          <button
            type="button"
            disabled={this.props.project.forward.length < 1}
            onClick={this.props.goForward}
          >
            Forward
          </button>
        </div>
        <div className="current-projects">
          <span>Current projects: </span>
        {
          this.showProjects().map(projects => {
            return (
            <Link to={`/map/${projects.projectName}`} >
            <div className="project-list">{projects.title}</div>
            </Link >
            )
          })
        }
        </div>
        <div id="tool-right">
          <span
          >{`Collaborators: ${this.props.project.metadata.collaborators.reduce(
            (acc, el) => {
              return acc + el.name + ' | ';
            },
            ''
          )}`}</span>
        </div>
      </div>
    );
  }
}

export default Toolbar;
