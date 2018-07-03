import React, { Component } from 'react'
import EditUserForm from './EditUserForm.jsx'
import firebase from 'firebase'
import { db } from '../../exports.js';
import './user.css'
import { numberOfProjects } from './function'

class UserPage extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
      editUserName: false
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.showForm = this.showForm.bind(this)
  }

  componentDidMount() {
        this.setState({
          userName: this.props.user.metadata.name,
          userEmail: this.props.user.metadata.email,
        });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const prevEmail = this.props.user.metadata.email
    const prevUser = this.props.user

    await db.collection('Users').doc(prevEmail).update({...prevUser, 'metadata': {
      name: this.state.userName, email: this.state.userEmail, uid: prevUser.metadata.uid
    } })

    this.setState({
      editUserName: false
    })
    }

    showForm() {
      this.setState({
        editUserName: true
      })

       console.log(this.state)
    }


  render() {
    return (
      <div>
  <div className="row">
    <div className="col s12 m6">
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">User Details</span>
          <div>
            <span className="card-indent">User name: </span>
            <span>{this.state.userName}</span>
          </div>
          <div>
            <span className="card-indent">Email address: </span>
            <span>{this.state.userEmail}</span>
          </div>
          <div>
             <span className="card-indent active-projects">Active projects:</span>
            <span>{numberOfProjects(this.props.user.projects)}</span>
          </div>
          <div className="toggle-edit-form">
          { this.state.editUserName ?
      <EditUserForm userName={this.state.userName} userEmail={this.state.userEmail}
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} className="edit-user-form" /> :
      <button className="edit-user-btn" type="submit" onClick={this.showForm} >Edit user details</button>
      }
      </div>
        </div>
      </div>
    </div>
  </div>

      </div >

    );
  }
}

export default UserPage



