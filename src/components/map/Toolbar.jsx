import React, { Component } from 'react';
import firebase from 'firebase';
import { NavLink } from 'react-router-dom';
import history from '../../history.js';
import SaveProjectForm from '../navbar/SaveProjectForm.jsx';
import AddCollaboratorForm from '../navbar/AddCollaboratorForm.jsx';
import { db } from '../../index.js';
import {
  displayForm,
  removeForm,
  checkUnique,
  updateUserProjects,
} from '../navbar/functions.js';

const styles = {
  container: {
    display: 'flex',
    'background-color': 'gray',
    'justify-content': 'space-between',
    'padding-left': '1%',
    'padding-right': '1%',
    height: '5vh',
    'align-items': 'center',
  },
  left: {
    display: 'flex',
    'justify-content': 'space-between',
    // width: '9%',
  },
  link: {
    color: 'white',
    'font-size': '1.3em',
    cursor: 'pointer',
  },
  title: {
    'margin-right': '10px',
  },
  icon: {
    margin: '5px',
  },
};

class Toolbar extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      recipientEmail: '',
      projectName: '',
      nonExistentCollaboratorsEmail: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      nonExistentCollaboratorsEmail: '',
    });
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
          const docRef = await db
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
        this.setState({
          [event.target.value]: '',
        });
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

      this.setState({
        [event.target.value]: '',
      });
      document.getElementById('save-form').classList.toggle('show');
    }
  }

  hideForm() {
    removeForm();
  }

  showForm(action) {
    displayForm(action);
  }
  render() {
    console.log(this.props.project, 'sssssssss');
    if (!this.props.project) return <div>Loding...</div>;
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
