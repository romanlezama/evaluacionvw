import React from 'react';
import Login from './components/Login';
import Home from '../home/components/Home';
import Transfer from '../transfer/components/Transfer'
import { Route, BrowserRouter as Router } from 'react-router-dom';

const LoginRoutes = (props) => (
  <Router>
    <Route
      exact
      path="/"
      render={
        ({ history }) => (
          <Login />
        )
      }
    />
    <Route
      exact
      path="/home"
      component={Home}
    />
    <Route
      exact
      path="/transfer"
      component={Transfer}
    />
  </Router>
);

export default LoginRoutes;