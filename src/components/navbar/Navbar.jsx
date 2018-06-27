import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './navbar.css';
import { db } from '../../index.js';
import { displayForm, removeForm, checkUnique } from './functions.js'
import UserIsLoggedIn from './UserIsLoggedIn.jsx'

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
        console.log('found user')
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
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      nonExistentCollaboratorsEmail: ''
    });

  }

  async handleSubmit(event) {
    event.preventDefault();
    if (event.target.name === 'collab-btn') {

        // check to see if collaborator exists in the system


        const userData = await db
        .collection('Users')
        .doc(this.state.recipientEmail).get()
        const foundUser = userData.data()


        if (!foundUser) {
          this.setState({
            nonExistentCollaboratorsEmail: this.state.recipientEmail
          })
        }



        if (!this.state.nonExistentCollaboratorsEmail) {


      const projectData = await db
      .collection('Projects')
      .doc(this.props.projectId).get()
      const metadata = projectData.data().metadata
      const collaborators = metadata.collaborators

      const alreadyAddedUser = checkUnique(collaborators, this.state.recipientEmail, this.state.userEmail).length

      if (!alreadyAddedUser) {
      const docRef = await db
      .collection('Projects')
      .doc(this.props.projectId).update({
       'metadata.collaborators': [...collaborators, {name: this.state.recipientName, email: this.state.recipientEmail}]
      })


      const projectId = this.props.projectId

      const updateCollaborator = await db
      .collection('Users')
      .doc(this.state.recipientEmail).update({
        'projects': {...foundUser.projects, [projectId]: {
          'collaborators': [{name: this.state.recipientName, email: this.state.recipientEmail}, ...collaborators],
          'owner': this.state.userEmail,
          'projectId': this.props.projectId,
          'title': projectData.data().metadata.title
        }
        }
      })


    //   window.open(
    //     `mailto:${
    //       this.state.recipientEmail
    //     }?subject=Invite to collaborate on a Bloom project&body=${
    //       this.state.userName
    //     } has invited you to collaborate on a project`
    //   );
      }
    }
  // } else if (event.target.name === 'save-btn') {


    }
  }


  hideForm() {
    removeForm()
  }

  showForm(action) {
    displayForm(action)
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
