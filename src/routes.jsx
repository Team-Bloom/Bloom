import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login';
import Dashboard from './Users/dashboard';

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
