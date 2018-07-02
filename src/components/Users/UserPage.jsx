import React, { Component } from 'react'
import EditUserForm from './EditUserForm.jsx'
import firebase from 'firebase'
import { db } from '../../index.js';

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
    }


  render() {
    return (
      <div>
      {/* { this.editUserName ? */}
      <EditUserForm userName={this.state.userName} userEmail={this.state.userEmail}
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      {/* : <div />} */}
      </div >

    );
  }
}

export default UserPage



