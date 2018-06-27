import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login.jsx';
import Dashboard from './components/Users/dashboard.jsx';
import MapView from './components/map/map.jsx';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.getuser = this.getuser.bind(this);
  }
  componentDidMount() {}

  getuser(user) {
    console.log('changing state', user)
    this.setState({
      user,
    });
  }

  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          path="/map/:projectId"
          render={(props) => <MapView {...props} user={this.state.user} />}
        />
        <Route
          exact
          path="/"
          render={(props) => <MapView {...props} user={this.state.user} />}
        />
        <Route
          path="/home"
          render={(props) => <Dashboard {...props} getuser={this.getuser} />}
        />
      </Switch>
    );
  }
}

export default Routes;
