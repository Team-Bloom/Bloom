import React, { Component } from 'react';
import { test } from './index.js';
const firebase = require('firebase');

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
        <h1>Welcome to My Awesome App</h1>
        <div id="firebaseui-auth-container" />
        <div id="loader">Loading...</div>
      </div>
      // <div>
      //   <form>
      //     <div>
      //       <label htmlFor="first">
      //         <small>First</small>
      //       </label>
      //       <input value={this.state.first} name="first" type="text" />
      //     </div>
      //     <div>
      //       <label htmlFor="last">
      //         <small>Last</small>
      //       </label>
      //       <input value={this.state.last} name="last" type="text" />
      //     </div>
      //     <div>
      //       <label htmlFor="email">
      //         <small>Email</small>
      //       </label>
      //       <input value={this.state.email} name="email" type="text" />
      //     </div>
      //     <div>
      //       <button type="submit" />
      //     </div>
      //     {/* {error && error.response && <div> {error.response.data} </div>} */}
      //   </form>
      //   {/* <a href="/auth/google">{displayName} with Google</a> */}
      // </div>
    );
  }
}

export default Login;
