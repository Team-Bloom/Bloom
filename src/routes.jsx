import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './Users/dashboard';
import {Node} from './components'
import Navbar from './components/navbar/Navbar.js'
// import UserPage from './components/Users/UserPage'

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/map" component={Node} />
          <Route path="/nav" component={Navbar} />
          {/* <Route path="/user-page" component={UserPage} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;



