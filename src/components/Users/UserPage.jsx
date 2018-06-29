import React, { Component } from 'react'
import EditUserForm from './EditUserForm.jsx'


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


  handleSubmit(event) {

  }


  render() {
    return (
      <div>



      { this.editUserName ?
      <EditUserForm userName={this.state.userName} userEmail={this.state.userEmail}
      handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      : <div />}
      </div >

    );
  }
}

export default UserPage



