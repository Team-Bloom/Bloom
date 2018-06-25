import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './components/Users/dashboard.jsx';

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map/:projectId" component={Map} />
        <Route path="/home" component={Dashboard} />
      </Switch>
    );
  }
}

export default Routes;



