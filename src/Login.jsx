import React, { Component } from 'react';

class Login extends Component {
  state = {
    first: '',
    last: '',
    email: '',
  };

  // handleSubmit() {}

  render() {
    return (
      <div>
        <form>
          <div>
            <label htmlFor="first">
              <small>First</small>
            </label>
            <input value={this.state.first} name="first" type="text" />
          </div>
          <div>
            <label htmlFor="last">
              <small>Last</small>
            </label>
            <input value={this.state.last} name="last" type="text" />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input value={this.state.email} name="email" type="text" />
          </div>
          <div>
            <button type="submit" />
          </div>
          {/* {error && error.response && <div> {error.response.data} </div>} */}
        </form>
        {/* <a href="/auth/google">{displayName} with Google</a> */}
      </div>
    );
  }
}

export default Login;
