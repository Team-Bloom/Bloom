import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './navbar.css';
import { db } from '../../index.js';
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
      recipientName: '',
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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('found user');
        this.setState({
          userName: user.displayName,
          userEmail: user.email,
        });
      } else {
        console.log('no user');
      }
    });
  }

  logOutUser() {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Signed Out');
          this.setState({
            userName: '',
            userEmail: '',
          });
        },
        function(error) {
          console.error('Sign Out Error', error);
        }
      );
    history.push('/login');
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
                  name: this.state.recipientName,
                  email: this.state.recipientEmail,
                },
              ],
            });

          const allCollaborators = [
            ...collaborators,
            {
              name: this.state.recipientName,
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
        recipientName={this.state.recipientName}
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
