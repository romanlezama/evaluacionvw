import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import LoginRoutes from './login/LoginRoutes';
//import HomeRoutes from './home/HomeRoutes';

class App extends Component {
  render(){
    return (
      <Fragment>
        <LoginRoutes/>
      </Fragment>
    );
  }
}

export default App;
