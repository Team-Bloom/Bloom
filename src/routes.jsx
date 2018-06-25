import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login';
import Dashboard from './Users/dashboard';
import {Node} from './components'
import Navbar from './Navbar'

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
