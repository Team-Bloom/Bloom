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
      userPassword: '',
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
    const projects = await this.props.user.projects
    const prevUser = this.props.user
    const listOfCollaborators = []


    for (let key in projects) {
      const collaborators = projects[key].collaborators
      const project = projects[key]
      let owner = projects[key].owner


      let userIndex;
      collaborators.forEach((collaborator, index) => {
        if (collaborator.email === owner) {
          userIndex = +index
        }
      })


      const updatedCollaborators = [...collaborators.slice(0, userIndex), {email: this.state.userEmail, name: this.state.userName}, ...collaborators.slice(userIndex +1)]
      console.log(updatedCollaborators)


      if (prevEmail === owner) {
        owner = this.state.userEmail
      }




      await db.collection('Projects').doc(key).update({...project, 'metadata': {
       collaborators: updatedCollaborators}, owner: owner
      })

      await db.collection('Users').doc(this.state.userEmail).update({...prevUser, 'metadata': {
        name: this.state.userName, email: this.state.userEmail, uid: prevUser.metadata.uid
      } })

      updatedCollaborators.forEach(async collaborator => {
          db.collection('Users').doc(collaborator.email).update({
            ['projects.' + key]: {
              ...projects[key], collaborators: updatedCollaborators, owner: owner
            }
          })
        })
      }
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



