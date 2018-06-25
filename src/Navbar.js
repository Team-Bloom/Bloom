import React, { Component } from 'react';
// import firebase from 'firebase'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor() {
    super()

    this.state = {
      projectName: '',
      collaborator: '',
      userName: '',
      userEmail: '',
      recipientName: '',
      recipientEmail: ''

    }

    this.saveProject = this.saveProject.bind(this)
    this.addCollaborator = this.addCollaborator.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
  }


  componentDidMount() {
      // const user = firebase.auth().currentUser
      // if (user) {
      //   this.setState({
      //     userName: user.name,
      //     userEmail: user.email
      //   })
      // }


    // console.log(user)
  }

  saveProject(event) {

  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })

  }


  handleSubmit(event) {
    event.preventDefault();
  }


  addCollaborator() {

    //emailJS or nodemailer
  }

  hideForm() {
    const popup = document.getElementById("collab-form");
    if (popup.classList.contains("show")) {
      popup.classList.remove("show");
    }
  }

  showForm() {
  const popup = document.getElementById("collab-form");
  if (!popup.classList.contains("show")) {
    popup.classList.add("show");
  }
  }

  render() {
    return (!this.state.userName) ? (
      <ul className="navbar-container">
      <li className="dropdown">
        <span className="dropbtn">Bloom</span>
        <div className="dropdown-content">
          <Link to="/user-page">
          <span>Profile & account</span>
          </ Link>
          <span>Preferences</span>
        </div>
      </li>
      <li className="dropdown">
        <span className="dropbtn" onMouseOver={this.hideForm}>Projects</span>
        <div className="dropdown-content">
         <span>New project</span>
          <span>Save as</span>
          <span>Open...</span>
          <div className="popup" onClick={this.showForm}>
          <span>Add collaborator</span>

          <form className="popuptext" id="collab-form">

     <label htmlFor="recipientName">First and last name</label>
      <input
        className="recipient-input"
        type="text"
        name="recipientName"
        onChange={this.state.handleChange}
        value={this.state.recipientName}
      />

      <label htmlFor="recipientEmail">Email</label>
      <input
        className="recipient-input"
        type="text"
        name="recipientEmail"
        onChange={this.handleChange}
        value={this.state.recipientEmail}
      />
      <button type="submit" className='email-form-btn' onClick={this.handleSubmit}>
        Share
      </button>
         </form>
        </div>
        </div>
      </li>
      <li className="logged-in"><span>Sign out</span></li>
    </ul>
    ) : (
      <ul className="navbar-container">
           <Link to='/login'>
      <li><span>Sign-in</span></li>
      </Link>
      <li><span>New project</span></li>
      </ul>
    )
  }
}

export default Navbar;
