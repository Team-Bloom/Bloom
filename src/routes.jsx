import { withRouter, Route, Switch, BrowserRouter } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './Login';

class Routes extends Component {
  componentDidMount() {}

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
