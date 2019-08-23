import React from 'react';
import Home from './components/Home';
import { Route, BrowserRouter as Router } from 'react-router-dom';

const HomeRoutes = () => (
  <React.Fragment>
    <Route
      exact
      path="/home"
      render={
        () => (
          <Home/>
        )
      }
    />
  </React.Fragment>
);

export default HomeRoutes;