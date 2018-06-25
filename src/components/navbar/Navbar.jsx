import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './navbar.css';
import AddCollaboratorForm from './AddCollaboratorForm.jsx';
import SaveProjectForm from './SaveProjectForm.jsx';

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      collaborator: '',
      userName: '',
      userEmail: '',
      recipientName: '',
      recipientEmail: '',
      projectName: '',
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
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (event.target.name === 'collab-btn') {
      window.open(
        `mailto:${
          this.state.recipientEmail
        }?subject=Invite to collaborate on a Bloom project&body=${
          this.state.userName
        } has invited you to collaborate on a project`
      );
    }
  }

  hideForm(action) {
    const formOne = document.getElementById('collab-form');
    const formTwo = document.getElementById('save-form');
    formOne.classList.remove('show');
    formTwo.classList.remove('show');
  }

  showForm(action) {
    if (action === 'addCollaborator') {
      const formTwo = document.getElementById('save-form');
      if (formTwo.classList.contains('show')) {
        formTwo.classList.remove('show');
      }
      const formOne = document.getElementById('collab-form');
      formOne.classList.add('show');
    } else if (action === 'save') {
      const formOne = document.getElementById('collab-form');
      if (formOne.classList.contains('show')) {
        formOne.classList.remove('show');
      }
      const formTwo = document.getElementById('save-form');
      formTwo.classList.add('show');
    }
  }

  render() {
    return this.state.userName ? (
      <ul className="navbar-container">
        <li className="dropdown">
          <span className="dropbtn">Bloom</span>
          <div className="dropdown-content">
            <Link to="/user-page">
              <span>Profile & account</span>
            </Link>
            <span>Preferences</span>
          </div>
        </li>
        <li className="dropdown">
          <span className="dropbtn" onMouseOver={this.hideForm}>
            Projects
          </span>
          <div className="dropdown-content">
            <span>New project</span>

            <SaveProjectForm
              showForm={this.showForm}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              projectName={this.state.projectName}
            />

            <span>Open...</span>
            <AddCollaboratorForm
              showForm={this.showForm}
              handleChange={this.handleChange}
              recipientName={this.state.recipientName}
              recipientEmail={this.state.recipientEmail}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </li>
        <li className="logged-in" onClick={this.logOutUser}>
          <span>Sign out</span>
        </li>
      </ul>
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
