import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './components/Users/dashboard.jsx';
import MapView from './components/map/map.jsx';

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/map/:projectId" component={MapView} />
        <Route path="/home" component={Dashboard} />
      </Switch>
    );
  }
}

export default Routes;
