import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './components/Users/dashboard.jsx';
import MapView from './components/map/map.jsx';
import MainNav from './components/navbar/MainNav.jsx';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/map/:projectId"
          render={props => <MapView {...props} user={this.props.user} />}
        />
        <Route
          exact
          path="/"
          render={props => <MapView {...props} user={this.props.user} />}
        />
        <Route
          path="/home"
          render={props => (
            <Dashboard
              {...props}
              user={this.props.user}
              selectMap={map => this.props.selectMap(map)}
            />
          )}
        />
      </Switch>
    );
  }
}

export default Routes;
