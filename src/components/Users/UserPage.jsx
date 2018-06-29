import React, { Component } from 'react'


class UserPage extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      userEmail: '',
    };
  }

  componentDidMount() {

        // this.setState({
        //   userName: this.props.user.displayName,
        //   userEmail: this.props.user.email,
        // });

        console.log(this.props.user)

  }


  render() {
    return (
      <div />
    );
  }
}

export default UserPage
