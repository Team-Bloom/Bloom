import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login';
import Dashboard from './Users/dashboard';
import { Map } from './components';

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map" component={Map} />
        <Route path="/home" component={Dashboard} />
      </Switch>
    );
  }
}

export default Routes;
