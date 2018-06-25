import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './Users/dashboard';
import {Node} from './components'
import Navbar from './components/navbar/Navbar.js'

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/map" component={Node} />
          <Route path="/nav" component={Navbar} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
