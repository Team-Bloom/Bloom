import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './navbar.css';
import { db } from '../../exports.js';
import {
  displayForm,
  removeForm,
  checkUnique,
  updateUserProjects,
} from './functions.js';
import UserIsLoggedIn from './UserIsLoggedIn.jsx';
import history from '../../history.js';

class Navbar extends Component {
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
    this.logOutUser = this.logOutUser.bind(this);
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
        }
        this.setState({
          [event.target.value]: '',
        });
        removeForm();
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
      removeForm();
    }
  }

  hideForm() {
    removeForm();
  }

  showForm(action) {
    displayForm(action);
  }

  render() {
    return this.state.userName ? (
      <UserIsLoggedIn
        showForm={this.showForm}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        projectName={this.state.projectName}
        recipientEmail={this.state.recipientEmail}
        hideForm={this.hideForm}
        collabName={this.state.nonExistentCollaboratorsEmail}
        logOutUser={this.logOutUser}
      />
    ) : (
      <ul className="navbar-container">
        <li>
          <Link to="/login">
            <span className="logged-out">Sign-in</span>
          </Link>
        </li>
        <li>
          <span className="logged-out">New project</span>
        </li>
      </ul>
    );
  }
}

export default Navbar;
