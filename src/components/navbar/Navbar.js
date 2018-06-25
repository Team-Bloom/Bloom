import React, { Component } from 'react';
import firebase from 'firebase';
import { Link } from 'react-router-dom';
import './navbar.css'

class Navbar extends Component {
  constructor() {
    super();

    this.state = {
      projectName: '',
      collaborator: '',
      userName: '',
      userEmail: '',
      recipientName: '',
      recipientEmail: '',
      projectName: ''
    };

    this.saveProject = this.saveProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.authUser = this.authUser.bind(this);
    this.logOutUser = this.logOutUser.bind(this)
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser(user);
      } else {
        console.log('no user');
      }
    });
  }


  logOutUser() {
    firebase.auth().signOut().then(() => {
      console.log('Signed Out');
      this.setState({
        userName: '',
        userEmail: ''
      })
    }, function(error) {
      console.error('Sign Out Error', error);
    });

  }

  authUser(user) {
    this.setState({
      userName: user.displayName,
      userEmail: user.email,
    });
  }

  saveProject(event) {


  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  hideForm(action) {
    const formOne = document.getElementById('collab-form');
    const formTwo = document.getElementById('save-form')
      formOne.classList.remove('show');
      formTwo.classList.remove('show');
  }

  showForm(action) {
    if (action === 'addCollaborator') {
    const formOne = document.getElementById('collab-form');
    if (!formOne.classList.contains('show')) {
      formOne.classList.add('show');
    }
    } else if (action === 'save') {
      const formTwo = document.getElementById('save-form');
      if (!formTwo.classList.contains('show')) {
        formTwo.classList.add('show');
      }
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

            <div className="popup" onClick={() => this.showForm('save')}>
            <span>Save as</span>
            <form className="popuptext" id="save-form" autoComplete="off">
                <label htmlFor="recipientName">Project name</label>
                <input
                  className="recipientName"
                  type="text"
                  name="recipientName"
                  onChange={this.handleChange}
                  value={this.state.recipientName}
                />
                <button
                  type="submit"
                  className="email-form-btn"
                  onClick={this.handleSubmit}
                >
                  Save
                </button>
              </form>
              </div>

            <span>Open...</span>
            <div className="popup" onClick={() => this.showForm('addCollaborator')}>
              <span>Add collaborator</span>

              <form className="popuptext" id="collab-form" autoComplete="off">
                <label htmlFor="recipientName">First and last name</label>
                <input
                  className="recipientName"
                  type="text"
                  name="recipientName"
                  onChange={this.handleChange}
                  value={this.state.recipientName}
                />
                <label htmlFor="recipientEmail">Email</label>
                <input
                  className="recipientEmail"
                  type="text"
                  name="recipientEmail"
                  onChange={this.handleChange}
                  value={this.state.recipientEmail}
                />
                <button
                  type="submit"
                  className="email-form-btn"
                  onClick={this.handleSubmit}
                >
                  Share
                </button>


              </form>
            </div>
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
